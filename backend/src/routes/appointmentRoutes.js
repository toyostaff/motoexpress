// backend/src/routes/appointmentRoutes.js

const express = require("express");

const router = express.Router();

const appointmentController = require("../controllers/appointmentController");

const authMiddleware = require("../middleware/authMiddleware");

// Obtener bloques ocupados
router.get("/ocupados", appointmentController.getOccupiedBlocks);

// Crear cita
router.post("/agendar", appointmentController.createAppointment);

// Listar citas administrador
router.get("/", authMiddleware, appointmentController.listarCitas);

router.get("/calendario", appointmentController.agendaTaller);


// Obtener cita por ID
router.get("/:id", authMiddleware, appointmentController.obtenerCita);



// Actualizar estado de cita
router.put(
  "/:id/estado",
  authMiddleware,
  appointmentController.actualizarEstado,
);


module.exports = router;
