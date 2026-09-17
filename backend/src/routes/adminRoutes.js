const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const appointmentService = require("../services/appointmentService");

const router = express.Router();

router.use(authMiddleware);

// 1. Ruta test
router.get("/test", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Acceso administrativo autorizado",
    administrador: {
      id: req.admin.id,
      usuario: req.admin.usuario,
    },
  });
});

// Operaciones generales / modificaciones
router.patch("/citas/:id/estado", (req, res) => {
  try {
    const cita = appointmentService.updateAppointmentStatus(
      Number(req.params.id),
      req.body.estado,
    );

    return res.status(200).json({
      ok: true,
      message: "Estado actualizado correctamente",
      cita,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

router.post("/citas-manuales", (req, res) => {
  try {
    const cita = appointmentService.createAppointment(req.body, true);

    return res.status(201).json({
      ok: true,
      message: "Cita manual registrada correctamente",
      cita,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

// 2. /citas (Listar todas)
router.get("/citas", (req, res) => {
  try {
    const citas = appointmentService.getAppointments();

    return res.status(200).json({
      ok: true,
      total: citas.length,
      citas,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

// 3. /citas/buscar (Ruta específica ANTES de la ruta dinámica por ID)
router.get("/citas/buscar", (req, res) => {
  try {
    const citas = appointmentService.searchAppointments(req.query);

    return res.status(200).json({
      ok: true,
      total: citas.length,
      citas,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

// 4. /citas/:id (Ruta dinámica)
router.get("/citas/:id", (req, res) => {
  try {
    const cita = appointmentService.getAppointmentById(Number(req.params.id));

    return res.status(200).json({
      ok: true,
      cita,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

// 5. /resumen-semanal
router.get("/resumen-semanal", (req, res) => {
  try {
    const { inicio, fin } = req.query;

    if (!inicio || !fin) {
      return res.status(400).json({
        ok: false,
        message: "Las fechas inicio y fin son obligatorias",
      });
    }

    const resumen = appointmentService.getWeeklySummary(inicio, fin);

    return res.status(200).json({
      ok: true,
      resumen,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

module.exports = router;