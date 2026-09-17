// backend/src/services/authService.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../database/database");
const config = require("../config/config");

function login(usuario, password) {
  const admin = db
    .prepare(
      `
      SELECT id, usuario, password_hash
      FROM administradores
      WHERE usuario = ?
    `,
    )
    .get(usuario);

  if (!admin) {
    return null;
  }

  const passwordValida = bcrypt.compareSync(password, admin.password_hash);

  if (!passwordValida) {
    return null;
  }

  const token = jwt.sign(
    {
      id: admin.id,
      usuario: admin.usuario,
    },
    config.auth.jwtSecret,
    {
      expiresIn: config.auth.jwtExpiresIn,
    },
  );

  return {
    token,
    administrador: {
      id: admin.id,
      usuario: admin.usuario,
    },
  };
}

module.exports = {
  login,
};
