const bcrypt = require("bcryptjs");
const db = require("./src/database/database");

const nuevaPassword = "admin123456";

const passwordHash = bcrypt.hashSync(
  nuevaPassword,
  12
);

db.prepare(
  `
  UPDATE administradores
  SET password_hash = ?
  WHERE usuario = ?
  `
).run(
  passwordHash,
  "motoexpress"
);

console.log("Contraseña actualizada correctamente");
