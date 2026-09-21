import AdminLayout from "../../layouts/AdminLayout";



function Citas() {


  const citas = [

    {
      cliente: "Carlos Pérez",
      telefono: "999 111 222",
      moto: "Honda CB190",
      servicio: "Cambio de aceite",
      fecha: "21/09/2026",
      hora: "10:00",
      estado: "Pendiente",
    },

    {
      cliente: "María López",
      telefono: "988 222 333",
      moto: "Yamaha MT-03",
      servicio: "Revisión frenos",
      fecha: "21/09/2026",
      hora: "14:00",
      estado: "Confirmado",
    },

    {
      cliente: "José Ramírez",
      telefono: "977 333 444",
      moto: "Bajaj Pulsar",
      servicio: "Batería",
      fecha: "22/09/2026",
      hora: "16:00",
      estado: "Atendido",
    },

    {
      cliente: "Ana Torres",
      telefono: "966 444 555",
      moto: "Suzuki GSX",
      servicio: "Mantenimiento",
      fecha: "23/09/2026",
      hora: "09:00",
      estado: "Cancelado",
    },

  ];



  const estadoStyle = (estado)=>{


    switch(estado){


      case "Pendiente":
        return "bg-orange-100 text-orange-700";


      case "Confirmado":
        return "bg-blue-100 text-blue-700";


      case "Atendido":
        return "bg-green-100 text-green-700";


      case "Cancelado":
        return "bg-red-100 text-red-700";


      default:
        return "bg-gray-100 text-gray-700";


    }


  };



  return (

    <AdminLayout>


      <div>


        {/* Encabezado */}

        <div className="
          flex
          justify-between
          items-center
          mb-8
        ">


          <div>

            <h1 className="
              text-3xl
              font-bold
              text-gray-800
            ">
              Gestión de Citas
            </h1>


            <p className="
              text-gray-500
              mt-2
            ">
              Administra las reservas del servicio técnico
            </p>

          </div>





        </div>




        {/* Filtros */}

        <div className="
          bg-white
          rounded-xl
          shadow-sm
          border
          border-gray-100
          p-5
          mb-6
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
        ">


          <input

            type="text"

            placeholder="Buscar cliente..."

            className="
              border
              rounded-lg
              px-4
              py-3
              outline-none
              focus:border-[#FF6A00]
            "

          />



          <select

            className="
              border
              rounded-lg
              px-4
              py-3
              outline-none
            "

          >

            <option>
              Todos los estados
            </option>

            <option>
              Pendiente
            </option>

            <option>
              Confirmado
            </option>

            <option>
              Atendido
            </option>

            <option>
              Cancelado
            </option>


          </select>




          <input

            type="date"

            className="
              border
              rounded-lg
              px-4
              py-3
            "

          />



        </div>





        {/* Tabla */}

        <div className="
          bg-white
          rounded-xl
          shadow-sm
          border
          border-gray-100
          overflow-hidden
        ">


          <table className="w-full">


            <thead className="
              bg-gray-50
              text-gray-600
            ">


              <tr>


                <th className="p-4 text-left">
                  Cliente
                </th>


                <th className="p-4 text-left">
                  Moto
                </th>


                <th className="p-4 text-left">
                  Servicio
                </th>


                <th className="p-4 text-left">
                  Fecha
                </th>


                <th className="p-4 text-left">
                  Hora
                </th>


                <th className="p-4 text-left">
                  Estado
                </th>


                <th className="p-4 text-left">
                  Acción
                </th>


              </tr>


            </thead>



            <tbody>


              {citas.map((item,index)=>(


                <tr
                  key={index}
                  className="
                    border-t
                    hover:bg-gray-50
                  "
                >


                  <td className="p-4">

                    <div className="font-semibold">

                      {item.cliente}

                    </div>


                    <div className="text-sm text-gray-500">

                      {item.telefono}

                    </div>


                  </td>



                  <td className="p-4">

                    {item.moto}

                  </td>



                  <td className="p-4">

                    {item.servicio}

                  </td>



                  <td className="p-4">

                    {item.fecha}

                  </td>



                  <td className="p-4">

                    {item.hora}

                  </td>



                  <td className="p-4">


                    <span className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      ${estadoStyle(item.estado)}
                    `}>

                      {item.estado}

                    </span>


                  </td>




                  <td className="p-4">


                    <button

                      className="
                        text-[#FF6A00]
                        font-semibold
                        hover:underline
                      "

                    >

                      Ver

                    </button>


                  </td>



                </tr>


              ))}


            </tbody>


          </table>


        </div>



      </div>


    </AdminLayout>

  );

}


export default Citas;