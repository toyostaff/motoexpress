const express = require("express");
const app = express();

// Middlewares
app.use(express.json());

// Importación de rutas
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const citaRoutes = require("./routes/citaRoutes"); // Importación agregada

// Registro de endpoints (app.use)
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/citas", citaRoutes); // Endpoint agregado

// Puerto y encendido del servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});