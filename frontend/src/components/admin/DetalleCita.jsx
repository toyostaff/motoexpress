import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";


function DetalleCita(){


  const cita = {

    cliente: "Carlos Pérez",

    telefono: "999 111 222",

    direccion: "Ate - Lima",

    moto: "Honda CB190",

    placa: "ABC-123",

    servicio: "Cambio de aceite",

    fecha: "21/09/2026",

    hora: "10:00",

    estado: "Pendiente"

  };



  return (

    <AdminLayout>


      <div>


        {/* CABECERA */}

        <div

          className="
            flex
            justify-between
            items-start
            mb-8
          "

        >


          <div>


            <Link

              to="/admin/citas"

              className="
                text-[#FF6A00]
                text-sm
                font-semibold
              "

            >

              ← Volver a citas

            </Link>



            <h1

              className="
                text-3xl
                font-bold
                text-gray-800
                mt-4
              "

            >

              Detalle de Cita

            </h1>



            <p

              className="
                text-gray-500
                mt-2
              "

            >

              Información completa del servicio solicitado

            </p>


          </div>




          <span

            className="
              bg-orange-100
              text-orange-700
              px-4
              py-2
              rounded-full
              font-semibold
            "

          >

            {cita.estado}

          </span>



        </div>





        {/* INFORMACIÓN */}


        <div

          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
          "

        >



          <Card titulo="👤 Cliente">


            <Info
              label="Nombre"
              value={cita.cliente}
            />


            <Info
              label="Teléfono"
              value={cita.telefono}
            />


            <Info
              label="Dirección"
              value={cita.direccion}
            />


          </Card>





          <Card titulo="🏍 Moto">


            <Info
              label="Modelo"
              value={cita.moto}
            />


            <Info
              label="Placa"
              value={cita.placa}
            />


          </Card>






          <Card titulo="🔧 Servicio">


            <Info
              label="Servicio solicitado"
              value={cita.servicio}
            />


          </Card>







          <Card titulo="📅 Programación">


            <Info
              label="Fecha"
              value={cita.fecha}
            />


            <Info
              label="Hora"
              value={cita.hora}
            />


          </Card>



        </div>







        {/* ACCIONES */}


        <div

          className="
            bg-white
            rounded-xl
            border
            border-gray-100
            shadow-sm
            p-6
            mt-8
          "

        >


          <h2

            className="
              text-xl
              font-bold
              text-gray-800
              mb-5
            "

          >

            Acciones de la cita

          </h2>




          <div

            className="
              flex
              flex-wrap
              gap-4
            "

          >



            <button

              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-3
                rounded-lg
                font-semibold
              "

            >

              Confirmar

            </button>





            <button

              className="
                bg-yellow-500
                hover:bg-yellow-600
                text-white
                px-5
                py-3
                rounded-lg
                font-semibold
              "

            >

              En proceso

            </button>





            <button

              className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-5
                py-3
                rounded-lg
                font-semibold
              "

            >

              Finalizar

            </button>





            <button

              className="
                bg-red-600
                hover:bg-red-700
                text-white
                px-5
                py-3
                rounded-lg
                font-semibold
              "

            >

              Cancelar

            </button>



          </div>



        </div>




      </div>


    </AdminLayout>


  );

}





function Card({titulo, children}){


  return (

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
          mb-5
        "

      >

        {titulo}

      </h2>



      {children}



    </div>

  );


}







function Info({label,value}){


  return (

    <div

      className="
        mb-4
      "

    >


      <p

        className="
          text-sm
          text-gray-500
        "

      >

        {label}

      </p>



      <p

        className="
          font-semibold
          text-gray-800
        "

      >

        {value}

      </p>



    </div>

  );


}




export default DetalleCita;