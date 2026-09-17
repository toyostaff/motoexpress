// backend/src/routes/appointmentRoutes.js

const express = require('express');
const appointmentController = require('../controllers/appointmentController');

const router = express.Router();

router.get('/ocupados', appointmentController.getOccupiedBlocks);
router.post('/agendar', appointmentController.createAppointment);


module.exports = router;


