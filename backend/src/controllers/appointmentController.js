// backend/src/controllers/appointmentController.js

const appointmentService = require("../services/appointmentService");

const { parseDate, isEnabledWeekDay } = require("../utils/bookingUtils");

const { isDateWithinBookingRange } = require("../utils/dateUtils");

function getOccupiedBlocks(req, res) {
  const { fecha } = req.query;

  if (!fecha || !parseDate(fecha)) {
    return res.status(400).json({
      ok: false,

      message: "Fecha inválida",
    });
  }

  if (!isDateWithinBookingRange(fecha)) {
    return res.status(400).json({
      ok: false,

      message: "Fecha fuera del rango permitido",
    });
  }

  if (!isEnabledWeekDay(fecha)) {
    return res.status(400).json({
      ok: false,

      message: "El día seleccionado no está habilitado",
    });
  }

  const ocupados = appointmentService.getOccupiedBlocks(fecha);

  const disponibles = appointmentService.getAvailableBlocks(fecha);

  return res.status(200).json({
    ok: true,

    fecha,

    ocupados,

    disponibles,
  });
}

function createAppointment(req, res) {
  try {
    const cita = appointmentService.createAppointment(req.body);

    return res.status(201).json({
      ok: true,

      message: "Cita registrada correctamente",

      cita,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,

      message: error.message,
    });
  }
}

function listarCitas(req, res) {
  try {
    const citas = appointmentService.getAppointments();

    return res.status(200).json({
      ok: true,

      data: citas,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,

      message: error.message,
    });
  }
}

function agendaTaller(req, res) {
  try {
    const { fecha } = req.query;

    if (!fecha) {
      return res.status(400).json({
        ok: false,
        message: "Debe enviar una fecha",
      });
    }

    const citas = appointmentService
      .getAppointments()
      .filter((item) => item.fecha === fecha);

    return res.status(200).json({
      ok: true,

      fecha,

      data: citas,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,

      message: error.message,
    });
  }
}

function obtenerCita(req, res) {
  try {
    const cita = appointmentService.getAppointmentById(req.params.id);

    return res.status(200).json({
      ok: true,

      data: cita,
    });
  } catch (error) {
    return res.status(404).json({
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

    return res.status(200).json({
      ok: true,

      data: cita,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,

      message: error.message,
    });
  }
}

module.exports = {

  getOccupiedBlocks,

  createAppointment,

  listarCitas,

  obtenerCita,

  actualizarEstado,

  agendaTaller,

};