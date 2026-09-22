import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/axios";


function DetalleCita() {

  const { id } = useParams();

  const [cita, setCita] = useState(null);

  const [cargando, setCargando] = useState(true);


  useEffect(() => {

    cargarCita();

  }, []);



  const cargarCita = async () => {

    try {

      const response = await api.get(`/citas/${id}`);

      setCita(response.data.data);

    } catch (error) {

      console.error(
        "Error cargando cita:",
        error
      );

    } finally {

      setCargando(false);

    }

  };



  const cambiarEstado = async (estado) => {


    if (estado === "Cancelado") {

      const confirmar = window.confirm(
        "¿Está seguro de cancelar esta cita?"
      );

      if (!confirmar) {
        return;
      }

    }


    try {


      await api.put(
        `/citas/${id}/estado`,
        {
          estado
        }
      );


      cargarCita();


    } catch (error) {

      console.error(
        "Error actualizando estado:",
        error
      );

    }


  };



  const estadoStyle = (estado) => {

    switch (estado) {

      case "Pendiente":
        return "bg-orange-100 text-orange-700";


      case "Confirmado":
        return "bg-blue-100 text-blue-700";


      case "Atendido":
        return "bg-green-100 text-green-700";


      case "Cancelado":
        return "bg-red-100 text-red-700";


      case "No realizado":
        return "bg-gray-100 text-gray-700";


      default:
        return "bg-gray-100 text-gray-700";

    }

  };



  if (cargando) {

    return (

      <AdminLayout>

        <div className="p-6">
          Cargando información...
        </div>

      </AdminLayout>

    );

  }



  if (!cita) {

    return (

      <AdminLayout>

        <div className="p-6">
          Cita no encontrada
        </div>

      </AdminLayout>

    );

  }



  const estadoFinal =
    cita.estado === "Atendido" ||
    cita.estado === "Cancelado" ||
    cita.estado === "No realizado";



  return (

    <AdminLayout>


      <div>


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
              font-semibold
              text-sm
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
            className={`
              px-4
              py-2
              rounded-full
              font-semibold
              ${estadoStyle(cita.estado)}
            `}
          >

            {cita.estado}

          </span>


        </div>





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
              value={cita.nombre_cliente}
            />


            <Info
              label="Teléfono"
              value={cita.telefono}
            />


            <Info
              label="Dirección"
              value={cita.direccion}
            />


            <Info
              label="Referencia"
              value={cita.referencia}
            />


          </Card>






          <Card titulo="🏍 Moto">


            <Info
              label="Marca"
              value={cita.marca_moto}
            />


            <Info
              label="Placa"
              value={cita.placa}
            />


          </Card>







          <Card titulo="🔧 Servicio">


            <Info
              label="Servicio solicitado"
              value={cita.motivo_trabajo}
            />


            <Info
              label="Detalle"
              value={cita.detalle_motivo}
            />


          </Card>







          <Card titulo="📅 Programación">


            <Info
              label="Fecha"
              value={cita.fecha}
            />


            <Info
              label="Horario"
              value={cita.bloque_hora}
            />


            <Info
              label="Turno"
              value={cita.turno}
            />


          </Card>



        </div>







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
              disabled={estadoFinal}
              onClick={() => cambiarEstado("Confirmado")}
              className="
              bg-blue-600
              hover:bg-blue-700
              disabled:bg-gray-400
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
              disabled={estadoFinal}
              onClick={() => cambiarEstado("Atendido")}
              className="
              bg-green-600
              hover:bg-green-700
              disabled:bg-gray-400
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
              disabled={estadoFinal}
              onClick={() => cambiarEstado("Cancelado")}
              className="
              bg-red-600
              hover:bg-red-700
              disabled:bg-gray-400
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






function Card({
  titulo,
  children
}) {

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






function Info({
  label,
  value
}) {


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

        {value || "-"}

      </p>


    </div>

  );


}




export default DetalleCita;