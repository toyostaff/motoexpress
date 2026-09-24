const appointmentService = require("../services/appointmentService");

const db = require("../database/database");
const ahora = new Date();

const fechaActual = ahora.toISOString().split("T")[0];

const horaActual = ahora.getHours();
const minutosActual = ahora.getMinutes();

function aplicarHeadersCache(res) {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );

  res.setHeader("Pragma", "no-cache");

  res.setHeader("Expires", "0");
}

// GET /api/citas
// GET /api/citas?estado=Pendiente
// GET /api/citas?nombre=Juan

function buscarCitas(req, res) {
  aplicarHeadersCache(res);

  try {
    const citas = appointmentService.searchAppointments(req.query);

    res.status(200).json({
      ok: true,

      data: citas,
    });
  } catch (error) {
    console.log("ERROR BUSCAR CITAS:", error.message);

    res.status(500).json({
      ok: false,

      message: error.message,
    });
  }
}

function listarCitas(req, res) {
  buscarCitas(req, res);
}

// GET /api/citas/:id

function obtenerCita(req, res) {
  aplicarHeadersCache(res);

  try {
    const cita = appointmentService.getAppointmentById(req.params.id);

    res.json({
      ok: true,

      data: cita,
    });
  } catch (error) {
    res.status(404).json({
      ok: false,

      message: error.message,
    });
  }
}

// PUT /api/citas/:id

function actualizarEstado(req, res) {
  try {
    const cita = appointmentService.updateAppointmentStatus(
      req.params.id,
      req.body.estado,
    );

    res.json({
      ok: true,

      data: cita,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,

      message: error.message,
    });
  }
}

function calendario(req, res) {
  try {
    const { fecha } = req.query;

    const citas = appointmentService
      .getAppointments()
      .filter((cita) => cita.fecha === fecha);

    res.json({
      ok: true,

      data: citas,
    });
  } catch (error) {
    console.log("ERROR CALENDARIO:", error.message);

    res.status(500).json({
      ok: false,

      message: error.message,
    });
  }
}
function ocupados(req, res) {
  try {
    const { fecha } = req.query;

    if (!fecha) {
      return res.status(400).json({
        mensaje: "Fecha requerida",
      });
    }

    const citas = db
      .prepare(
        `
      SELECT bloque_hora
      FROM citas
      WHERE fecha = ?
      AND estado NOT IN ('Cancelado','No realizado')
    `,
      )
      .all(fecha);

    const horas = [
      "08:00 - 09:00",
      "09:00 - 10:00",
      "10:00 - 11:00",
      "11:00 - 12:00",
      "12:00 - 13:00",
      "14:00 - 15:00",
      "15:00 - 16:00",
      "16:00 - 17:00",
      "17:00 - 18:00",
      "18:00 - 19:00",
      "19:00 - 20:00",
      "20:00 - 21:00",
      "21:00 - 22:00",
    ];

    const ocupados = citas.map((item) => item.bloque_hora);

    const ahora = new Date();

    // Fecha actual formato YYYY-MM-DD
    const fechaHoy = `${ahora.getFullYear()}-${String(
      ahora.getMonth() + 1,
    ).padStart(2, "0")}-${String(ahora.getDate()).padStart(2, "0")}`;

    const horaActual = ahora.getHours();

    const disponibles = horas.filter((hora) => {
      // Si ya existe una cita
      if (ocupados.includes(hora)) {
        return false;
      }

      // Fechas anteriores
      if (fecha < fechaHoy) {
        return false;
      }

      // Si es hoy
      if (fecha === fechaHoy) {
        const horaInicio = parseInt(hora.substring(0, 2));

        // Bloque ya iniciado
        if (horaInicio <= horaActual) {
          return false;
        }
      }

      return true;
    });

    res.json({
      fecha,

      disponibles,

      ocupados,
    });
  } catch (error) {
    console.error("ERROR OCUPADOS:", error);

    res.status(500).json({
      mensaje: "Error cargando disponibilidad",
    });
  }
}
function crearCita(req, res) {

  try {

    const cita = appointmentService.createAppointment(
      req.body,
      false
    );


    res.status(201).json({

      ok: true,

      message: "Cita registrada correctamente",

      data: cita

    });


  } catch (error) {


    console.log(
      "ERROR CREAR CITA:",
      error.message
    );


    res.status(400).json({

      ok:false,

      message:error.message

    });


  }

}

// eséra

// PUT /api/citas/:id

function actualizarEstado(req, res) {

  try {

    const cita = appointmentService.updateAppointmentStatus(
      req.params.id,
      req.body.estado,
    );

    res.json({
      ok: true,
      data: cita,
    });

  } catch (error) {

    res.status(400).json({
      ok: false,
      message: error.message,
    });

  }

}






module.exports = {

 listarCitas,
 buscarCitas,
 obtenerCita,
 actualizarEstado,
 calendario,
 ocupados,
 crearCita

};