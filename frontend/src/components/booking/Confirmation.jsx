import api from "../../api/axios";


function Confirmation({

formData,
previousStep

}){


async function submit(){

const response = await api.post(

"/citas/agendar",

formData

);


alert(response.data.message);

}



return (

<div>


<h2 className="text-2xl font-bold">

Confirma tu cita

</h2>



<div className="
mt-6
space-y-3
bg-gray-100
p-6
rounded-lg
">


<p>
Cliente:
{formData.nombre_cliente}
</p>


<p>
Moto:
{formData.marca_moto}
</p>


<p>
Placa:
{formData.placa}
</p>


<p>
Servicio:
{formData.motivo_trabajo}
</p>


<p>
Fecha:
{formData.fecha}
</p>


<p>
Horario:
{formData.bloque_hora}
</p>


</div>



<div className="flex justify-between mt-8">


<button

onClick={previousStep}

className="border px-8 py-3 rounded-lg"

>

← Anterior

</button>



<button

onClick={submit}

className="
bg-orange-500
text-white
px-8
py-3
rounded-lg
"

>

Confirmar cita

</button>


</div>


</div>

)

}


export default Confirmation;

