const db = require("../database/database");

function dashboard(req, res) {
  try {
    const pendientes = db
      .prepare(
        `
            SELECT COUNT(*) total
            FROM citas
            WHERE estado='Pendiente'
            `,
      )
      .get().total;

    const confirmadas = db
      .prepare(
        `
            SELECT COUNT(*) total
            FROM citas
            WHERE estado='Confirmado'
            `,
      )
      .get().total;

    const atendidas = db
      .prepare(
        `
            SELECT COUNT(*) total
            FROM citas
            WHERE estado='Atendido'
            `,
      )
      .get().total;

    const canceladas = db
      .prepare(
        `
            SELECT COUNT(*) total
            FROM citas
            WHERE estado='Cancelado'
            `,
      )
      .get().total;

    res.json({
      ok: true,

      data: {
        pendientes,

        confirmadas,

        atendidas,

        canceladas,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,

      message: error.message,
    });
  }
}

module.exports = {
  dashboard,
};
