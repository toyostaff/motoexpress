import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import api from "../../api/axios";


function Calendario() {

  const [fecha, setFecha] = useState("");

  const [ocupados, setOcupados] = useState([]);

  const [disponibles, setDisponibles] = useState([]);

  const [cargando, setCargando] = useState(false);


  useEffect(() => {

    const hoy = new Date();

    const fechaActual =
      hoy.toISOString().split("T")[0];

    setFecha(fechaActual);

    cargarHorarios(fechaActual);

  }, []);



  const cargarHorarios = async (fechaSeleccionada) => {

    try {

      setCargando(true);


      const response = await api.get(
        `/citas/ocupados?fecha=${fechaSeleccionada}`
      );


      setOcupados(
        response.data.ocupados || []
      );


      setDisponibles(
        response.data.disponibles || []
      );


    } catch(error){

      console.error(
        "Error cargando horarios:",
        error
      );

      setOcupados([]);

      setDisponibles([]);

    } finally {

      setCargando(false);

    }

  };



  const cambiarFecha = (e)=>{

    const nuevaFecha = e.target.value;

    setFecha(nuevaFecha);

    cargarHorarios(nuevaFecha);

  };



  return (

    <AdminLayout>


      <div>


        <h1
          className="
            text-3xl
            font-bold
            text-gray-800
          "
        >
          Calendario
        </h1>



        <p
          className="
            mt-2
            text-gray-500
          "
        >
          Control de horarios disponibles.
        </p>



        <div
          className="
            bg-white
            rounded-xl
            shadow-sm
            border
            border-gray-100
            p-6
            mt-8
          "
        >


          <label
            className="
              block
              text-sm
              font-semibold
              text-gray-700
              mb-2
            "
          >
            Seleccionar fecha
          </label>



          <input

            type="date"

            value={fecha}

            onChange={cambiarFecha}

            className="
              border
              rounded-lg
              px-4
              py-3
              outline-none
              focus:border-[#FF6A00]
            "

          />


        </div>




        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            mt-6
          "
        >


          {/* DISPONIBLES */}

          <div
            className="
              bg-white
              rounded-xl
              shadow-sm
              border
              border-gray-100
              p-6
            "
          >

            <h2
              className="
                text-xl
                font-bold
                text-gray-800
                mb-4
              "
            >
              🟢 Horarios disponibles
            </h2>



            {
              cargando ? (

                <p>
                  Cargando...
                </p>

              )

              :

              disponibles.length === 0 ? (

                <p className="text-gray-500">
                  No hay horarios disponibles
                </p>

              )

              :

              disponibles.map((hora)=>(
                
                <div
                  key={hora}
                  className="
                    bg-green-100
                    text-green-700
                    px-4
                    py-3
                    rounded-lg
                    mb-2
                    font-semibold
                  "
                >
                  {hora}
                </div>

              ))

            }


          </div>




          {/* OCUPADOS */}

          <div
            className="
              bg-white
              rounded-xl
              shadow-sm
              border
              border-gray-100
              p-6
            "
          >

            <h2
              className="
                text-xl
                font-bold
                text-gray-800
                mb-4
              "
            >
              🔴 Horarios ocupados
            </h2>



            {
              cargando ? (

                <p>
                  Cargando...
                </p>

              )

              :

              ocupados.length === 0 ? (

                <p className="text-gray-500">
                  No existen citas registradas
                </p>

              )

              :

              ocupados.map((hora)=>(

                <div
                  key={hora}
                  className="
                    bg-red-100
                    text-red-700
                    px-4
                    py-3
                    rounded-lg
                    mb-2
                    font-semibold
                  "
                >
                  {hora}
                </div>

              ))

            }


          </div>


        </div>



      </div>


    </AdminLayout>

  );

}


export default Calendario;