// backend/src/database/database.js

const { Pool } = require("pg");

const config = require("../config/config");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;

