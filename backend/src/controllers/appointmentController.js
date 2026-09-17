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

module.exports = {
  getOccupiedBlocks,
  createAppointment,
};