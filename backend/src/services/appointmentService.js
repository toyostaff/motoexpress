const db = require("../database/database");
const config = require("../config/config");

const { normalizePlate, isValidPlate } = require("../utils/plateUtils");

const {
  parseDate,
  isEnabledWeekDay,
  getTurnByBlock,
  isValidBlock,
} = require("../utils/bookingUtils");

const { isDateWithinBookingRange } = require("../utils/dateUtils");

const { isFutureBlockForToday } = require("../utils/timeUtils");

function getAllBlocks() {
  return [...config.booking.morningBlocks, ...config.booking.afternoonBlocks];
}

function getOccupiedBlocks(fecha) {
  return db
    .prepare(
      `
      SELECT bloque_hora
      FROM citas
      WHERE fecha = ?
        AND estado IN ('Pendiente','Confirmado','Atendido')
      ORDER BY bloque_hora
      `,
    )
    .all(fecha)
    .map((cita) => cita.bloque_hora);
}

function getAvailableBlocks(fecha) {
  const occupiedBlocks = new Set(getOccupiedBlocks(fecha));

  return getAllBlocks().filter((bloque) => {
    if (occupiedBlocks.has(bloque)) {
      return false;
    }

    if (!isFutureBlockForToday(fecha, bloque)) {
      return false;
    }

    return true;
  });
}

function isBlockAvailable(fecha, bloqueHora) {
  const cita = db
    .prepare(
      `
      SELECT id
      FROM citas
      WHERE fecha = ?
        AND bloque_hora = ?
        AND estado IN ('Pendiente','Confirmado','Atendido')
      LIMIT 1
      `,
    )
    .get(fecha, bloqueHora);

  return !cita;
}

function hasPendingAppointmentByPlate(placa) {
  const normalizedPlate = normalizePlate(placa);

  const cita = db
    .prepare(
      `
    SELECT id
    FROM citas
    WHERE placa = ?
      AND estado = 'Pendiente'
    LIMIT 1
  `,
    )
    .get(normalizedPlate);

  return Boolean(cita);
}

function createAppointment(data, creadoPorAdmin = false) {
  const {
    nombre_cliente,
    telefono,
    marca_moto,
    detalle_marca,
    placa,
    direccion,
    referencia,
    motivo_trabajo,
    detalle_motivo,
    fecha,
    bloque_hora,
  } = data;

  if (
    !nombre_cliente ||
    !telefono ||
    !marca_moto ||
    !placa ||
    !direccion ||
    !motivo_trabajo ||
    !fecha ||
    !bloque_hora
  ) {
    throw new Error("Faltan campos obligatorios");
  }

  if (!config.motorcycleBrands.includes(marca_moto)) {
    throw new Error("Marca de moto inválida");
  }

  if (marca_moto === "OTROS" && !detalle_marca?.trim()) {
    throw new Error("Debe especificar la marca de la moto");
  }

  if (!config.serviceTypes.includes(motivo_trabajo)) {
    throw new Error("Motivo de trabajo inválido");
  }

  if (motivo_trabajo === "Otros" && !detalle_motivo?.trim()) {
    throw new Error("Debe especificar el motivo del trabajo");
  }

  if (!isValidPlate(placa)) {
    throw new Error("Placa inválida");
  }

  if (!parseDate(fecha)) {
    throw new Error("Fecha inválida");
  }

  if (!isDateWithinBookingRange(fecha)) {
    throw new Error("Fecha fuera del rango permitido");
  }

  if (!isEnabledWeekDay(fecha)) {
    throw new Error("El día seleccionado no está habilitado");
  }

  if (!isValidBlock(bloque_hora)) {
    throw new Error("Bloque horario inválido");
  }

  if (!isFutureBlockForToday(fecha, bloque_hora)) {
    throw new Error("El bloque horario seleccionado ya pasó");
  }

  const normalizedPlate = normalizePlate(placa);

  if (hasPendingAppointmentByPlate(normalizedPlate)) {
    throw new Error("La placa ya tiene una cita pendiente");
  }

  if (!isBlockAvailable(fecha, bloque_hora)) {
    throw new Error("El bloque horario ya está ocupado");
  }

  const turno = getTurnByBlock(bloque_hora);

  try {
    const result = db
      .prepare(
        `
      INSERT INTO citas (
        nombre_cliente,
        telefono,
        marca_moto,
        detalle_marca,
        placa,
        direccion,
        referencia,
        motivo_trabajo,
        detalle_motivo,
        fecha,
        turno,
        bloque_hora,
        estado,
        creado_por_admin
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pendiente', ?)
    `,
      )
      .run(
        nombre_cliente.trim(),
        telefono.trim(),
        marca_moto,
        detalle_marca?.trim() || null,
        normalizedPlate,
        direccion.trim(),
        referencia?.trim() || null,
        motivo_trabajo,
        detalle_motivo?.trim() || null,
        fecha,
        turno,
        bloque_hora,
        creadoPorAdmin ? 1 : 0,
      );

    return db
      .prepare(
        `
      SELECT *
      FROM citas
      WHERE id = ?
    `,
      )
      .get(result.lastInsertRowid);
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      throw new Error("La cita ya no se encuentra disponible");
    }

    throw error;
  }
}

function updateAppointmentStatus(id, estado) {
  if (!config.appointmentStates.includes(estado)) {
    throw new Error("Estado de cita inválido");
  }

  const cita = db
    .prepare(
      `
    SELECT *
    FROM citas
    WHERE id = ?
  `,
    )
    .get(id);

  if (!cita) {
    throw new Error("Cita no encontrada");
  }

  const estadosFinales = ["Atendido", "Cancelado", "No realizado"];

  if (estadosFinales.includes(cita.estado)) {
    throw new Error("La cita ya tiene un estado final");
  }

  if (estado === "Pendiente") {
    throw new Error("La cita ya se encuentra pendiente");
  }

  db.prepare(
    `
    UPDATE citas
    SET estado = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `,
  ).run(estado, id);

  return db
    .prepare(
      `
    SELECT *
    FROM citas
    WHERE id = ?
  `,
    )
    .get(id);
}

function getAppointments() {
  return db
    .prepare(
      `
    SELECT *
    FROM citas
    ORDER BY fecha ASC, bloque_hora ASC, id ASC
  `,
    )
    .all();
}

function getAppointmentById(id) {
  const cita = db
    .prepare(
      `
    SELECT *
    FROM citas
    WHERE id = ?
  `,
    )
    .get(id);

  if (!cita) {
    throw new Error("Cita no encontrada");
  }

  return cita;
}

function getWeeklySummary(fechaInicio, fechaFin) {
  if (!parseDate(fechaInicio) || !parseDate(fechaFin)) {
    throw new Error("Rango de fechas inválido");
  }

  if (fechaInicio > fechaFin) {
    throw new Error("La fecha inicial no puede ser mayor que la fecha final");
  }

  const total = db
    .prepare(
      `
    SELECT COUNT(*) AS cantidad
    FROM citas
    WHERE fecha BETWEEN ? AND ?
  `,
    )
    .get(fechaInicio, fechaFin).cantidad;

  const estadosRows = db
    .prepare(
      `
    SELECT estado, COUNT(*) AS cantidad
    FROM citas
    WHERE fecha BETWEEN ? AND ?
    GROUP BY estado
  `,
    )
    .all(fechaInicio, fechaFin);

  const estados = {
    Pendiente: 0,
    Confirmado: 0,
    Atendido: 0,
    Cancelado: 0,
    "No realizado": 0,
  };

  for (const row of estadosRows) {
    if (Object.prototype.hasOwnProperty.call(estados, row.estado)) {
      estados[row.estado] = row.cantidad;
    }
  }

  const serviciosRows = db
    .prepare(
      `
    SELECT motivo_trabajo, COUNT(*) AS cantidad
    FROM citas
    WHERE fecha BETWEEN ? AND ?
      AND estado = 'Atendido'
    GROUP BY motivo_trabajo
    ORDER BY cantidad DESC, motivo_trabajo ASC
  `,
    )
    .all(fechaInicio, fechaFin);

  return {
    fecha_inicio: fechaInicio,
    fecha_fin: fechaFin,
    total_citas: total,
    estados,
    servicios_atendidos: serviciosRows,
  };
}
function searchAppointments(filters = {}) {
  const {
    nombre,

    placa,

    telefono,

    estado,

    inicio,

    fin,
  } = filters;

  let query = `

SELECT

id,

nombre_cliente,

telefono,

marca_moto,

motivo_trabajo,

fecha,

bloque_hora,

estado

FROM citas

WHERE 1=1

`;

  const params = [];

  if (nombre && nombre.trim() !== "") {
    query += `

AND LOWER(nombre_cliente)
LIKE LOWER(?)

`;

    params.push(`%${nombre.trim()}%`);
  }

  if (placa && placa.trim() !== "") {
    query += `

AND placa = ?

`;

    params.push(normalizePlate(placa));
  }

  if (telefono && telefono.trim() !== "") {
    query += `

AND telefono LIKE ?

`;

    params.push(`%${telefono.trim()}%`);
  }

  if (estado && estado.trim() !== "") {
    query += `

AND estado = ?

`;

    params.push(estado.trim());
  }

  if (inicio && fin) {
    query += `

AND fecha BETWEEN ? AND ?

`;

    params.push(inicio, fin);
  }

  query += `

ORDER BY fecha ASC, bloque_hora ASC

`;

  const resultado = db.prepare(query).all(...params);

  return resultado;
}

module.exports = {
  getAllBlocks,
  getOccupiedBlocks,
  getAvailableBlocks,
  isBlockAvailable,
  hasPendingAppointmentByPlate,
  createAppointment,
  updateAppointmentStatus,
  getAppointments,
  getAppointmentById,
  getWeeklySummary,
  searchAppointments,
};
