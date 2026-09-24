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
      process.env.FRONTEND_URL
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