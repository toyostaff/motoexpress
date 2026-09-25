const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const citaRoutes = require("./routes/citaRoutes");

const app = express();


app.use(cors({
    origin: "*",
    methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS"
    ],
    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ]
}));


app.options("*", cors());


app.use(express.json());


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