// backend/src/database/initAdmin.js

const bcrypt = require('bcryptjs');
const db = require('./database');
const config = require('../config/config');

function initAdmin() {
  const { adminUser, adminPassword } = config.auth;

  if (!adminUser || !adminPassword) {
    throw new Error('ADMIN_USER y ADMIN_PASSWORD son obligatorios');
  }

  const total = db
    .prepare('SELECT COUNT(*) AS total FROM administradores')
    .get().total;

  if (total > 0) {
    return;
  }

  const passwordHash = bcrypt.hashSync(adminPassword, 12);

  db.prepare(`
    INSERT INTO administradores (usuario, password_hash)
    VALUES (?, ?)
  `).run(adminUser, passwordHash);

  console.log('Administrador inicial creado correctamente');
}

module.exports = initAdmin;



