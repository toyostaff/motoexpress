function PersonalForm({
    formData,
    setFormData,
    nextStep
}) {


    function handleChange(e) {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value

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

                Tus datos personales

            </h2>


            <p
                className="
text-gray-500
mt-2
"
            >

                Completa la informacion para continuar

            </p>



            <div
                className="
mt-8
space-y-5
"
            >


                <div>

                    <label className="block font-semibold mb-2">

                        Nombre completo *

                    </label>


                    <input

                        name="nombre_cliente"

                        value={formData.nombre_cliente}

                        onChange={handleChange}

                        placeholder="Ej. Juan Perez Garcia"

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



                <div>

                    <label className="block font-semibold mb-2">

                        Telefono *

                    </label>


                    <input

                        name="telefono"

                        value={formData.telefono}

                        onChange={handleChange}

                        placeholder="Ej. 987654321"

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




                <div>

                    <label className="block font-semibold mb-2">

                        Direccion *

                    </label>


                    <input

                        name="direccion"

                        value={formData.direccion}

                        onChange={handleChange}

                        placeholder="Ej. Av. Los Olivos 123"

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




                <div>

                    <label className="block font-semibold mb-2">

                        Referencia

                    </label>


                    <input

                        name="referencia"

                        value={formData.referencia}

                        onChange={handleChange}

                        placeholder="Ej. Cerca al parque"

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



            </div>



            <div
                className="
flex
justify-end
mt-10
"
            >


                <button

                    onClick={nextStep}

                    className="
bg-orange-500
hover:bg-orange-600
text-white
font-bold
px-8
py-3
rounded-lg
"

                >

                    Siguiente →

                </button>


            </div>



        </div>

    )

}


export default PersonalForm;