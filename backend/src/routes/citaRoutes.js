const express = require("express");

const router = express.Router();

const citaController = require("../controllers/citaController");

const authMiddleware = require("../middleware/authMiddleware");


// CALENDARIO
router.get(
 "/calendario",
 citaController.calendario
);


// DISPONIBILIDAD
router.get(
 "/ocupados",
 citaController.ocupados
);


// LISTAR
router.get(
 "/",
 authMiddleware,
 citaController.buscarCitas
);


// OBTENER ID
router.get(
 "/:id",
 authMiddleware,
 citaController.obtenerCita
);

// ACTUALIZAR ESTADO
router.put(
 "/:id/estado",
 authMiddleware,
 citaController.actualizarEstado
);

// CREAR CITA CLIENTE

router.post(
  "/agendar",
  citaController.crearCita
);




module.exports = router;