const services = [
  {
    value: "Cambio de aceite",
    icon: "🔧"
  },
  {
    value: "Revision de frenos",
    icon: "⚙️"
  },
  {
    value: "Revision de luces",
    icon: "💡"
  },
  {
    value: "Revision de bateria",
    icon: "🔋"
  },
  {
    value: "Otros",
    icon: "➕"
  }
];


function ServiceForm({
  formData,
  setFormData,
  nextStep,
  previousStep
}) {


function selectService(service){

setFormData({

...formData,

motivo_trabajo:service

});

}



return (

<div>


<h2 className="text-2xl font-bold text-[#0B1115]">

Que servicio necesita tu moto?

</h2>


<p className="text-gray-500 mt-2">

Selecciona el servicio requerido

</p>



<div

className="
grid
grid-cols-1
sm:grid-cols-2
gap-5
mt-8
"

>


{
services.map((service)=>(


<button

key={service.value}

onClick={()=>selectService(service.value)}

className={`
p-6
border
rounded-xl
text-center
transition

${
formData.motivo_trabajo === service.value
?
"border-orange-500 bg-orange-50"
:
"hover:border-orange-400"
}

`}

>


<div className="text-4xl">

{service.icon}

</div>


<div className="font-bold mt-3">

{service.value}

</div>


</button>


))

}


</div>



{
formData.motivo_trabajo === "Otros" && (

<input

name="detalle_motivo"

value={formData.detalle_motivo}

onChange={(e)=>

setFormData({

...formData,

detalle_motivo:e.target.value

})

}

placeholder="Detalle del servicio requerido"

className="
mt-6
w-full
border
rounded-lg
px-4
py-3
"

/>

)

}




<div className="flex justify-between mt-10">


<button

onClick={previousStep}

className="
border
px-8
py-3
rounded-lg
font-bold
"

>

← Anterior

</button>



<button

onClick={nextStep}

className="
bg-orange-500
text-white
px-8
py-3
rounded-lg
font-bold
"

>

Siguiente →

</button>


</div>


</div>

)

}


export default ServiceForm;
