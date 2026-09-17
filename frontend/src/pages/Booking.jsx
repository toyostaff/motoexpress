import { useState } from "react";

import StepIndicator from "../components/booking/StepIndicator";

import PersonalForm from "../components/booking/PersonalForm";
import MotorcycleForm from "../components/booking/MotorcycleForm";
import ServiceForm from "../components/booking/ServiceForm";
import ScheduleForm from "../components/booking/ScheduleForm";
import Confirmation from "../components/booking/Confirmation";


function Booking(){

const [currentStep,setCurrentStep] = useState(1);


const [formData,setFormData] = useState({

nombre_cliente:"",
telefono:"",
direccion:"",
referencia:"",

marca_moto:"",
detalle_marca:"",
placa:"",

motivo_trabajo:"",
detalle_motivo:"",

fecha:"",
bloque_hora:""

});



return (

<div

className="
min-h-screen
bg-gray-100
py-10
px-6
"

>


<div

className="
max-w-5xl
mx-auto
bg-white
rounded-xl
shadow-xl
p-8
"

>


<h1

className="
text-3xl
font-bold
text-[#0B1115]
mb-10
"

>

Agenda tu cita

</h1>



<StepIndicator

currentStep={currentStep}

/>



<div className="mt-10">


{
currentStep === 1 && (

<PersonalForm

formData={formData}

setFormData={setFormData}

nextStep={()=>setCurrentStep(2)}

/>

)

}



{
currentStep === 2 && (

<MotorcycleForm

formData={formData}

setFormData={setFormData}

previousStep={()=>setCurrentStep(1)}

nextStep={()=>setCurrentStep(3)}

/>

)

}



{
currentStep === 3 && (

<ServiceForm

formData={formData}

setFormData={setFormData}

previousStep={()=>setCurrentStep(2)}

nextStep={()=>setCurrentStep(4)}

/>

)

}



{
currentStep === 4 && (

<ScheduleForm

formData={formData}

setFormData={setFormData}

previousStep={()=>setCurrentStep(3)}

nextStep={()=>setCurrentStep(5)}

/>

)

}



{
currentStep === 5 && (

<Confirmation

formData={formData}

previousStep={()=>setCurrentStep(4)}

/>

)

}


</div>


</div>


</div>

)

}


export default Booking;