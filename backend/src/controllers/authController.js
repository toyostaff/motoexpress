// backend/src/controllers/authController.js

const authService = require('../services/authService');

async function login(req, res) {
    const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({
      ok: false,
      message: 'Usuario y contraseña son obligatorios',
    });
  }

const resultado = await authService.login(usuario, password);

  if (!resultado) {
    return res.status(401).json({
      ok: false,
      message: 'Credenciales incorrectas',
    });
  }

  return res.status(200).json({
    ok: true,
    ...resultado,
  });
}

module.exports = {
  login,
};


