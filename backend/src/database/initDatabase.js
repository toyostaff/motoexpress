// backend/src/database/initDatabase.js

const db = require('./database');

function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS administradores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS citas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre_cliente TEXT NOT NULL,
      telefono TEXT NOT NULL,
      marca_moto TEXT NOT NULL,
      detalle_marca TEXT,
      placa TEXT NOT NULL,
      direccion TEXT NOT NULL,
      referencia TEXT,
      motivo_trabajo TEXT NOT NULL,
      detalle_motivo TEXT,
      fecha TEXT NOT NULL,
      turno TEXT NOT NULL,
      bloque_hora TEXT NOT NULL,
      estado TEXT NOT NULL DEFAULT 'Pendiente',
      creado_por_admin INTEGER NOT NULL DEFAULT 0 CHECK (creado_por_admin IN (0, 1)),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_cita_slot_activo
    ON citas(fecha, bloque_hora)
    WHERE estado = 'Pendiente';

    CREATE UNIQUE INDEX IF NOT EXISTS idx_placa_pendiente
    ON citas(placa)
    WHERE estado = 'Pendiente';

    CREATE INDEX IF NOT EXISTS idx_citas_fecha
    ON citas(fecha);

    CREATE INDEX IF NOT EXISTS idx_citas_estado
    ON citas(estado);
  `);
}

module.exports = initDatabase;


