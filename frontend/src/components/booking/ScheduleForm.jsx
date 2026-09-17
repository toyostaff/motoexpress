import {useState} from "react";
import api from "../../api/axios";


const hours=[

"08:00 - 09:00",
"09:00 - 10:00",
"10:00 - 11:00",
"11:00 - 12:00",
"12:00 - 13:00",

"14:00 - 15:00",
"15:00 - 16:00",
"16:00 - 17:00"

];


function ScheduleForm({

formData,
setFormData,
nextStep,
previousStep

}){


const [available,setAvailable]=useState([]);



async function changeDate(e){

const fecha=e.target.value;


setFormData({

...formData,

fecha

});


const response=await api.get(

`/citas/ocupados?fecha=${fecha}`

);


setAvailable(response.data.disponibles);


}



return (

<div>


<h2 className="text-2xl font-bold">

Selecciona fecha y horario

</h2>



<input

type="date"

value={formData.fecha}

onChange={changeDate}

className="
mt-6
border
rounded-lg
px-4
py-3
"

/>



<div

className="
grid
grid-cols-2
gap-4
mt-8
"

>


{
hours.map(hour=>(


<button

key={hour}

disabled={
!available.includes(hour)
}

onClick={()=>setFormData({

...formData,

bloque_hora:hour

})}


className={`

p-3
rounded-lg
border

${
formData.bloque_hora===hour
?
"bg-orange-500 text-white"
:
""

}

${
!available.includes(hour)
?
"opacity-40 cursor-not-allowed"
:
""

}

`}

>

{hour}

</button>


))

}


</div>



<div className="flex justify-between mt-10">


<button

onClick={previousStep}

className="border px-8 py-3 rounded-lg"

>

← Anterior

</button>



<button

onClick={nextStep}

className="bg-orange-500 text-white px-8 py-3 rounded-lg"

>

Siguiente →

</button>


</div>


</div>

)

}


export default ScheduleForm;

