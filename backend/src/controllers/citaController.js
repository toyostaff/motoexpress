const db = require("../database/database");



function listarCitas(req,res){


    try{


        const citas = db.prepare(
            `
            SELECT
                id,
                nombre_cliente,
                telefono,
                moto,
                servicio,
                fecha,
                hora,
                estado

            FROM citas

            ORDER BY fecha ASC, hora ASC

            `
        )
        .all();



        res.json({

            ok:true,

            data:citas

        });



    }catch(error){


        res.status(500).json({

            ok:false,

            message:error.message

        });


    }


}





function obtenerCita(req,res){


    try{


        const {id}=req.params;



        const cita = db.prepare(

            `
            SELECT *
            FROM citas
            WHERE id=?

            `

        )
        .get(id);



        if(!cita){

            return res.status(404).json({

                ok:false,

                message:"Cita no encontrada"

            });

        }



        res.json({

            ok:true,

            data:cita

        });



    }catch(error){


        res.status(500).json({

            ok:false,

            message:error.message

        });


    }


}





module.exports={

    listarCitas,

    obtenerCita

};

