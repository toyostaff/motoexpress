const appointmentService = require("../services/appointmentService");

function aplicarHeadersCache(res) {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );

  res.setHeader("Pragma", "no-cache");

  res.setHeader("Expires", "0");
}

// GET /api/citas
// GET /api/citas?estado=Pendiente
// GET /api/citas?nombre=Juan

function buscarCitas(req, res) {
  aplicarHeadersCache(res);

  try {
    const citas = appointmentService.searchAppointments(req.query);

    res.status(200).json({
      ok: true,

      data: citas,
    });
  } catch (error) {
    console.log("ERROR BUSCAR CITAS:", error.message);

    res.status(500).json({
      ok: false,

      message: error.message,
    });
  }
}

function listarCitas(req, res) {
  buscarCitas(req, res);
}

// GET /api/citas/:id

function obtenerCita(req, res) {
  aplicarHeadersCache(res);

  try {
    const cita = appointmentService.getAppointmentById(req.params.id);

    res.json({
      ok: true,

      data: cita,
    });
  } catch (error) {
    res.status(404).json({
      ok: false,

      message: error.message,
    });
  }
}

// PUT /api/citas/:id

function actualizarEstado(req, res) {
  try {
    const cita = appointmentService.updateAppointmentStatus(
      req.params.id,
      req.body.estado,
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

function calendario(req, res) {
  try {
    const { fecha } = req.query;

    const citas = appointmentService
      .getAppointments()
      .filter((cita) => cita.fecha === fecha);

    res.json({
      ok: true,

      data: citas,
    });
  } catch (error) {
    console.log("ERROR CALENDARIO:", error.message);

    res.status(500).json({
      ok: false,

      message: error.message,
    });
  }
}
module.exports = {
  listarCitas,

  buscarCitas,

  obtenerCita,

  actualizarEstado,

  calendario,
};
