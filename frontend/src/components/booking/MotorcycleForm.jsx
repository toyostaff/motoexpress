function MotorcycleForm({
  formData,
  setFormData,
  nextStep,
  previousStep
}) {


function handleChange(e){

const {name,value}=e.target;


setFormData({

...formData,

[name]:value

});

}



return (

<div>


<h2

className="
text-2xl
font-bold
text-[#0B1115]
"

>

Datos de tu moto

</h2>


<p

className="
text-gray-500
mt-2
"

>

Cuentanos un poco sobre tu moto

</p>



<div

className="
mt-8
space-y-5
"

>


<div>

<label

className="
block
font-semibold
mb-2
"

>

Marca *

</label>


<select

name="marca_moto"

value={formData.marca_moto}

onChange={handleChange}

className="
w-full
border
rounded-lg
px-4
py-3
focus:outline-none
focus:ring-2
focus:ring-orange-500
"

>


<option value="">

Selecciona una marca

</option>


<option value="HONDA">

HONDA

</option>


<option value="YAMAHA">

YAMAHA

</option>


<option value="BAJAJ">

BAJAJ

</option>


<option value="SUZUKI">

SUZUKI

</option>


<option value="OTROS">

OTROS

</option>


</select>


</div>




{
formData.marca_moto === "OTROS" && (


<div>

<label

className="
block
font-semibold
mb-2
"

>

Detalle de marca *

</label>


<input

name="detalle_marca"

value={formData.detalle_marca}

onChange={handleChange}

placeholder="Especifique la marca"

className="
w-full
border
rounded-lg
px-4
py-3
focus:outline-none
focus:ring-2
focus:ring-orange-500
"

/>


</div>


)

}





<div>

<label

className="
block
font-semibold
mb-2
"

>

Placa *

</label>



<input

name="placa"

value={formData.placa}

onChange={handleChange}

placeholder="Ej. ABC-123"

className="
w-full
border
rounded-lg
px-4
py-3
uppercase
focus:outline-none
focus:ring-2
focus:ring-orange-500
"

/>


</div>



</div>




<div

className="
flex
justify-between
mt-10
"

>


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
hover:bg-orange-600
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


export default MotorcycleForm;