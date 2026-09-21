const express = require("express");

const router = express.Router();


const citaController =
require("../controllers/citaController");

const authMiddleware =
require("../middleware/authMiddleware");




router.get(

"/",

authMiddleware,

citaController.listarCitas

);



router.get(

"/:id",

authMiddleware,

citaController.obtenerCita

);



module.exports = router;