const path = require("path");
require("dotenv").config();

const ROOT_DIR = path.resolve(__dirname, "../..");

const config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",

  auth: {
    adminUser: process.env.ADMIN_USER,
    adminPassword: process.env.ADMIN_PASSWORD,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "8h",
  },

  database: {
    path: path.resolve(
      ROOT_DIR,
      process.env.DB_PATH || "./data/moto_express.db",
    ),
  },

  timezone: "America/Lima",

  booking: {
    maxAdvanceDays: 30,

    enabledWeekDays: [1, 2, 3, 4, 5, 6],

morningBlocks: [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
],

afternoonBlocks: [
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
  "21:00 - 22:00",
],
  },

  motorcycleBrands: ["HONDA", "SUZUKI", "TVS", "BAJAJ", "YAMAHA", "OTROS"],

serviceTypes: [
  "Cambio de aceite",
  "Revision de frenos",
  "Revision de luces",
  "Revision de bateria",
  "Otros",
],

  appointmentStates: [
    "Pendiente",
    "Confirmado",
    "Atendido",
    "Cancelado",
    "No realizado",
  ],
};

module.exports = config;
