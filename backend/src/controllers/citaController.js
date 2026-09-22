// backend/src/controllers/citaController.js

const db = require("../database/database");

const appointmentService = require("../services/appointmentService");

function listarCitas(req, res) {
  try {
    const citas = db
      .prepare(
        `
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

            ORDER BY fecha ASC, bloque_hora ASC
            `,
      )
      .all();

    res.json({
      ok: true,

      data: citas,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,

      message: error.message,
    });
  }
}

function obtenerCita(req, res) {
  try {
    const { id } = req.params;

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
      return res.status(404).json({
        ok: false,

        message: "Cita no encontrada",
      });
    }

    res.json({
      ok: true,

      data: cita,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,

      message: error.message,
    });
  }
}

function actualizarEstado(req, res) {
  try {
    const { id } = req.params;

    const { estado } = req.body;

    const cita = appointmentService.updateAppointmentStatus(
      id,

      estado,
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

  obtenerCita,

  actualizarEstado,
};
