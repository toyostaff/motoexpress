// backend/src/database/database.js

const Database = require('better-sqlite3');
const config = require('../config/config');

const db = new Database(config.database.path);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

module.exports = db;

