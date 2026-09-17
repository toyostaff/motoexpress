// backend/src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      ok: false,
      message: 'Token de acceso requerido',
    });
  }

  const token = authorization.substring(7);

  try {
    const decoded = jwt.verify(
      token,
      config.auth.jwtSecret
    );

    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({
      ok: false,
      message: 'Token inválido o expirado',
    });
  }
}

module.exports = authMiddleware;

