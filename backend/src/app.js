const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const citaRoutes = require("./routes/citaRoutes");

const app = express();


app.use(
  cors({
    origin:[
      "http://localhost:5173",
      "https://silver-spork-7vrw4pp6grqqfxrr4-5173.app.github.dev",
      "https://motoexpress-frontend-production.up.railway.app"
    ],
    credentials:true
  })
);
app.use(express.json());


app.get("/api/health",(req,res)=>{
  res.json({
    ok:true,
    service:"MotoExpress API"
  });
});


app.use("/api/auth",authRoutes);

app.use("/api/admin",adminRoutes);

// IMPORTANTE
app.use("/api/citas",citaRoutes);


module.exports = app;