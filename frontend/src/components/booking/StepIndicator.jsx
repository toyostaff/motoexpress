const steps = [
  "Datos personales",
  "Datos moto",
  "Servicio",
  "Fecha y horario",
  "Confirmacion"
];


function StepIndicator({ currentStep }) {


return (

<div
className="
flex
justify-between
items-center
mb-10
"
>


{
steps.map((step,index)=>{

const number = index + 1;

const active = number <= currentStep;


return (

<div
key={step}
className="
flex
flex-col
items-center
flex-1
"
>


<div

className={`
w-10
h-10
rounded-full
flex
items-center
justify-center
font-bold

${
active
?
"bg-orange-500 text-white"
:
"bg-gray-200 text-gray-500"
}

`}

>

{number}

</div>


<span

className="
text-xs
mt-2
text-center
"

>

{step}

</span>


</div>

)

})

}


</div>

)

}


export default StepIndicator;