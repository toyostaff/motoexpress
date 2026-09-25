const db = require("../database/database");
const config = require("../config/config");

const { normalizePlate, isValidPlate } = require("../utils/plateUtils");

const {
  parseDate,
  isEnabledWeekDay,
  getTurnByBlock,
  isValidBlock,
} = require("../utils/bookingUtils");

const { isDateWithinBookingRange } = require("../utils/dateUtils");

const { isFutureBlockForToday } = require("../utils/timeUtils");



function getAllBlocks(){

  return [
    ...config.booking.morningBlocks,
    ...config.booking.afternoonBlocks
  ];

}




async function getOccupiedBlocks(fecha){

  const result = await db.query(
    `
    SELECT bloque_hora
    FROM citas
    WHERE fecha=$1
    AND estado IN ('Pendiente','Confirmado','Atendido')
    ORDER BY bloque_hora
    `,
    [fecha]
  );


  return result.rows.map(
    item=>item.bloque_hora
  );

}




async function getAvailableBlocks(fecha){

  const ocupados =
    new Set(
      await getOccupiedBlocks(fecha)
    );


  return getAllBlocks().filter(
    bloque=>{

      if(ocupados.has(bloque))
        return false;


      if(!isFutureBlockForToday(fecha,bloque))
        return false;


      return true;

    }
  );

}





async function isBlockAvailable(fecha,bloqueHora){

  const result = await db.query(
    `
    SELECT id
    FROM citas
    WHERE fecha=$1
    AND bloque_hora=$2
    AND estado IN ('Pendiente','Confirmado','Atendido')
    LIMIT 1
    `,
    [
      fecha,
      bloqueHora
    ]
  );


  return result.rows.length===0;

}





async function hasPendingAppointmentByPlate(placa){

  const result = await db.query(
    `
    SELECT id
    FROM citas
    WHERE placa=$1
    AND estado='Pendiente'
    LIMIT 1
    `,
    [
      normalizePlate(placa)
    ]
  );


  return result.rows.length>0;

}





async function createAppointment(data, creadoPorAdmin=false){


const {
nombre_cliente,
telefono,
marca_moto,
detalle_marca,
placa,
direccion,
referencia,
motivo_trabajo,
detalle_motivo,
fecha,
bloque_hora
}=data;



if(
!nombre_cliente ||
!telefono ||
!marca_moto ||
!placa ||
!direccion ||
!motivo_trabajo ||
!fecha ||
!bloque_hora
){

throw new Error(
"Faltan campos obligatorios"
);

}




if(!config.motorcycleBrands.includes(marca_moto))
throw new Error("Marca de moto inválida");



if(
marca_moto==="OTROS" &&
!detalle_marca?.trim()
)
throw new Error("Debe especificar la marca de la moto");




if(!config.serviceTypes.includes(motivo_trabajo))
throw new Error("Motivo de trabajo inválido");




if(!isValidPlate(placa))
throw new Error("Placa inválida");



if(!parseDate(fecha))
throw new Error("Fecha inválida");



if(!isDateWithinBookingRange(fecha))
throw new Error("Fecha fuera del rango permitido");



if(!isEnabledWeekDay(fecha))
throw new Error("El día seleccionado no está habilitado");



if(!isValidBlock(bloque_hora))
throw new Error("Bloque horario inválido");




if(!isFutureBlockForToday(fecha,bloque_hora))
throw new Error("El bloque horario seleccionado ya pasó");




const placaNormalizada =
normalizePlate(placa);



if(await hasPendingAppointmentByPlate(placaNormalizada))
throw new Error("La placa ya tiene una cita pendiente");




if(!(await isBlockAvailable(fecha,bloque_hora)))
throw new Error("El bloque horario ya está ocupado");





const turno =
getTurnByBlock(bloque_hora);



const result = await db.query(
`
INSERT INTO citas
(
nombre_cliente,
telefono,
marca_moto,
detalle_marca,
placa,
direccion,
referencia,
motivo_trabajo,
detalle_motivo,
fecha,
turno,
bloque_hora,
estado,
creado_por_admin
)
VALUES
(
$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'Pendiente',$13
)
RETURNING *
`,
[
nombre_cliente.trim(),
telefono.trim(),
marca_moto,
detalle_marca || null,
placaNormalizada,
direccion.trim(),
referencia || null,
motivo_trabajo,
detalle_motivo || null,
fecha,
turno,
bloque_hora,
creadoPorAdmin
]
);



return result.rows[0];

}





async function updateAppointmentStatus(id,estado){


const existe =
await db.query(
`
SELECT *
FROM citas
WHERE id=$1
`,
[id]
);



if(existe.rows.length===0)
throw new Error("Cita no encontrada");



await db.query(
`
UPDATE citas
SET estado=$1,
updated_at=CURRENT_TIMESTAMP
WHERE id=$2
`,
[
estado,
id
]
);



const result =
await db.query(
`
SELECT *
FROM citas
WHERE id=$1
`,
[id]
);



return result.rows[0];

}





async function getAppointments(){


const result =
await db.query(
`
SELECT *
FROM citas
ORDER BY fecha ASC,bloque_hora ASC,id ASC
`
);


return result.rows;

}





async function getAppointmentById(id){


const result =
await db.query(
`
SELECT *
FROM citas
WHERE id=$1
`,
[id]
);



if(result.rows.length===0)
throw new Error("Cita no encontrada");



return result.rows[0];

}





async function searchAppointments(filters={}){


let query=`

SELECT
id,
nombre_cliente,
telefono,
marca_moto,
motivo_trabajo,
fecha,
bloque_hora,
estado

FROM citas

WHERE 1=1

`;



const params=[];



if(filters.nombre){

params.push(`%${filters.nombre}%`);

query+=`
AND nombre_cliente ILIKE $${params.length}
`;

}



if(filters.placa){

params.push(
normalizePlate(filters.placa)
);

query+=`
AND placa=$${params.length}
`;

}



if(filters.estado){

params.push(filters.estado);

query+=`
AND estado=$${params.length}
`;

}



query+=`
ORDER BY fecha ASC,bloque_hora ASC
`;



const result =
await db.query(
query,
params
);



return result.rows;

}





module.exports={

getAllBlocks,

getOccupiedBlocks,

getAvailableBlocks,

isBlockAvailable,

hasPendingAppointmentByPlate,

createAppointment,

updateAppointmentStatus,

getAppointments,

getAppointmentById,

searchAppointments

};// force railway rebuild
