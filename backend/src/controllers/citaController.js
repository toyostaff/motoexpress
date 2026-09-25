const appointmentService = require("../services/appointmentService");

const db = require("../database/database");


function aplicarHeadersCache(res) {

  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );

  res.setHeader(
    "Pragma",
    "no-cache"
  );

  res.setHeader(
    "Expires",
    "0"
  );

}



// GET /api/citas
async function buscarCitas(req,res){

  aplicarHeadersCache(res);

  try {


    const citas =
      await appointmentService.searchAppointments(
        req.query
      );


    res.status(200).json({

      ok:true,

      data:citas

    });



  } catch(error){


    console.log(
      "ERROR BUSCAR CITAS:",
      error.message
    );


    res.status(500).json({

      ok:false,

      message:error.message

    });


  }

}



async function listarCitas(req,res){

  buscarCitas(req,res);

}





// GET /api/citas/:id
async function obtenerCita(req,res){

  aplicarHeadersCache(res);


  try {


    const cita =
      await appointmentService.getAppointmentById(
        req.params.id
      );



    res.json({

      ok:true,

      data:cita

    });



  }catch(error){


    res.status(404).json({

      ok:false,

      message:error.message

    });


  }

}





// PUT /api/citas/:id/estado
async function actualizarEstado(req,res){


  try {


    const cita =
      await appointmentService.updateAppointmentStatus(
        req.params.id,
        req.body.estado
      );



    res.json({

      ok:true,

      data:cita

    });



  }catch(error){


    res.status(400).json({

      ok:false,

      message:error.message

    });


  }

}





// GET /api/citas/calendario
async function calendario(req,res){


  try {


    const {fecha}=req.query;


    const citas =
      await appointmentService.getAppointments();



    const filtradas =
      citas.filter(
        cita=>cita.fecha === fecha
      );



    res.json({

      ok:true,

      data:filtradas

    });



  }catch(error){


    console.log(
      "ERROR CALENDARIO:",
      error.message
    );


    res.status(500).json({

      ok:false,

      message:error.message

    });


  }

}





// GET /api/citas/ocupados?fecha=YYYY-MM-DD
async function ocupados(req,res){


  try {


    const {fecha}=req.query;



    if(!fecha){

      return res.status(400).json({

        mensaje:"Fecha requerida"

      });

    }



    const resultado =
      await db.query(
        `
        SELECT bloque_hora
        FROM citas
        WHERE fecha = $1
        AND estado NOT IN ('Cancelado','No realizado')
        `,
        [fecha]
      );



    const citas =
      resultado.rows;



    const horas = [

      "08:00 - 09:00",
      "09:00 - 10:00",
      "10:00 - 11:00",
      "11:00 - 12:00",
      "12:00 - 13:00",
      "14:00 - 15:00",
      "15:00 - 16:00",
      "16:00 - 17:00",
      "17:00 - 18:00",
      "18:00 - 19:00",
      "19:00 - 20:00",
      "20:00 - 21:00",
      "21:00 - 22:00"

    ];



    const ocupados =
      citas.map(
        item=>item.bloque_hora
      );



    res.json({

      fecha,

      disponibles:
        horas.filter(
          hora=>!ocupados.includes(hora)
        ),

      ocupados

    });



  }catch(error){


    console.error(
      "ERROR OCUPADOS:",
      error
    );


    res.status(500).json({

      mensaje:"Error cargando disponibilidad"

    });


  }

}





// POST /api/citas/agendar
async function crearCita(req,res){


  try {


    const cita =
      await appointmentService.createAppointment(
        req.body,
        false
      );



    res.status(201).json({

      ok:true,

      message:"Cita registrada correctamente",

      data:cita

    });



  }catch(error){


    console.log(
      "ERROR CREAR CITA:",
      error.message
    );


    res.status(400).json({

      ok:false,

      message:error.message

    });


  }

}




module.exports = {

  listarCitas,

  buscarCitas,

  obtenerCita,

  actualizarEstado,

  calendario,

  ocupados,

  crearCita

};