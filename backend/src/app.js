const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const citaRoutes = require("./routes/citaRoutes");

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "https://silver-spork-7vrw4pp6grqqfxrr4-5173.app.github.dev",
  "https://motoexpress-frontend-production.up.railway.app"
];


app.use(
  cors({
    origin: function(origin, callback){

      if(!origin){
        return callback(null,true);
      }

      if(allowedOrigins.includes(origin)){
        return callback(null,true);
      }

      return callback(new Error("No permitido por CORS"));
    },
    credentials:true
  })
);


app.use(express.json());


// Debug
app.use((req,res,next)=>{
  console.log(
    "REQUEST:",
    req.method,
    req.url
  );
  next();
});


app.get("/api/health",(req,res)=>{
  res.json({
    ok:true,
    service:"MotoExpress API"
  });
});


app.use("/api/auth",authRoutes);

app.use("/api/admin",adminRoutes);

app.use("/api/citas",citaRoutes);

app.use("/api/appointments",appointmentRoutes);


module.exports = app;