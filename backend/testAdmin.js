const db = require("./src/database/database");

const admin = db
  .prepare(
    `
    SELECT id, usuario 
    FROM administradores
    `
  )
  .all();

console.log(admin);

