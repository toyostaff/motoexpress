const express = require("express");

const router = express.Router();

const citaController = require("../controllers/citaController");

const authMiddleware = require("../middleware/authMiddleware");


// CALENDARIO
router.get(
  "/calendario",
  citaController.calendario
);


// LISTAR / BUSCAR CITAS
router.get(
  "/",
  authMiddleware,
  citaController.buscarCitas
);


// OBTENER POR ID
router.get(
  "/:id",
  authMiddleware,
  citaController.obtenerCita
);


// ACTUALIZAR ESTADO
router.put(
  "/:id",
  authMiddleware,
  citaController.actualizarEstado
);


module.exports = router;