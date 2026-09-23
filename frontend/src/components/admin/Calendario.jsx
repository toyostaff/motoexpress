import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/axios";

function Calendario() {
  const [fecha, setFecha] = useState("");

  const [citas, setCitas] = useState([]);

  const [cargando, setCargando] = useState(false);

  const horarios = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
    "21:00 - 22:00",
  ];

  const resumen = {
    total: horarios.length,

    disponibles: horarios.filter(
      (hora) => !citas.find((cita) => cita.bloque_hora === hora),
    ).length,

    pendientes: citas.filter((cita) => cita.estado === "Pendiente").length,

    confirmadas: citas.filter((cita) => cita.estado === "Confirmado").length,

    atendidas: citas.filter((cita) => cita.estado === "Atendido").length,
  };

  useEffect(() => {
    const hoy = new Date();

    const fechaActual = hoy.toISOString().split("T")[0];

    setFecha(fechaActual);

    cargarAgenda(fechaActual);
  }, []);

  const cargarAgenda = async (fechaSeleccionada) => {
    try {
      setCargando(true);

      const response = await api.get(
        `/citas/calendario?fecha=${fechaSeleccionada}`,
      );

      setCitas(response.data.data || []);
    } catch (error) {
      console.error("Error cargando calendario:", error);

      setCitas([]);
    } finally {
      setCargando(false);
    }
  };

  const cambiarFecha = (e) => {
    const nuevaFecha = e.target.value;

    setFecha(nuevaFecha);

    cargarAgenda(nuevaFecha);
  };

  // Busca la cita activa del horario
  // Ignora canceladas si existe otra cita

  const obtenerCitaHora = (hora) => {
    const citasHorario = citas.filter((item) => item.bloque_hora === hora);

    const citaActiva = citasHorario.find((item) => item.estado !== "Cancelado");

    return citaActiva || null;
  };

  const tieneCancelada = (hora) => {
    return citas.some(
      (item) => item.bloque_hora === hora && item.estado === "Cancelado",
    );
  };

  const colorEstado = (estado) => {
    switch (estado) {
      case "Pendiente":
        return {
          tarjeta: "bg-orange-50 border-orange-200",

          badge: "bg-orange-200 text-orange-800",
        };

      case "Confirmado":
        return {
          tarjeta: "bg-blue-50 border-blue-200",

          badge: "bg-blue-200 text-blue-800",
        };

      case "Atendido":
        return {
          tarjeta: "bg-green-50 border-green-200",

          badge: "bg-green-200 text-green-800",
        };

      case "Cancelado":
        return {
          tarjeta: "bg-red-50 border-red-200",

          badge: "bg-red-200 text-red-800",
        };

      default:
        return {
          tarjeta: "bg-gray-50 border-gray-200",

          badge: "bg-gray-200 text-gray-700",
        };
    }
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
          Agenda diaria del taller MotoExpress.
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
            "
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Agenda del Taller
          </h2>

          <div
            className="
grid
grid-cols-2
md:grid-cols-5
gap-4
mb-6
"
          >
            <div
              className="
bg-gray-50
border
rounded-lg
p-4
"
            >
              <p className="text-sm text-gray-500">Total horarios</p>

              <p
                className="
text-2xl
font-bold
text-gray-800
"
              >
                {resumen.total}
              </p>
            </div>

            <div
              className="
bg-green-50
border
border-green-200
rounded-lg
p-4
"
            >
              <p className="text-sm text-green-700">Disponibles</p>

              <p
                className="
text-2xl
font-bold
text-green-700
"
              >
                {resumen.disponibles}
              </p>
            </div>

            <div
              className="
bg-orange-50
border
border-orange-200
rounded-lg
p-4
"
            >
              <p className="text-sm text-orange-700">Pendientes</p>

              <p
                className="
text-2xl
font-bold
text-orange-700
"
              >
                {resumen.pendientes}
              </p>
            </div>

            <div
              className="
bg-blue-50
border
border-blue-200
rounded-lg
p-4
"
            >
              <p className="text-sm text-blue-700">Confirmadas</p>

              <p
                className="
text-2xl
font-bold
text-blue-700
"
              >
                {resumen.confirmadas}
              </p>
            </div>

            <div
              className="
bg-emerald-50
border
border-emerald-200
rounded-lg
p-4
"
            >
              <p className="text-sm text-emerald-700">Atendidas</p>

              <p
                className="
text-2xl
font-bold
text-emerald-700
"
              >
                {resumen.atendidas}
              </p>
            </div>
          </div>

          {cargando ? (
            <p>Cargando agenda...</p>
          ) : (
            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4
              gap-5
              "
            >
              {horarios.map((hora) => {
                const cita = obtenerCitaHora(hora);

                const cancelada = tieneCancelada(hora);

                return (
                  <div
                    key={hora}
                    className="
                  border
                  rounded-xl
                  p-4
                  h-[280px]
                  flex
                  flex-col
                  "
                  >
                    <div
                      className="
                    flex
                    justify-between
                    items-center
                    mb-3
                    "
                    >
                      <h3
                        className="
                      font-bold
                      text-gray-700
                      text-sm
                      "
                      >
                        {hora}
                      </h3>

                      {cita && (
                        <span
                          className={`
                      px-2
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      ${colorEstado(cita.estado).badge}
                      `}
                        >
                          {cita.estado}
                        </span>
                      )}
                    </div>

                    {cita ? (
                      <div
                        className={`
                      border
                      rounded-xl
                      p-4
                      flex-1
                      ${colorEstado(cita.estado).tarjeta}
                      `}
                      >
                        <p
                          className="
                        font-bold
                        text-gray-800
                        text-sm
                        "
                        >
                          👤 {cita.nombre_cliente}
                        </p>

                        <p className="text-xs mt-2">📞 {cita.telefono}</p>

                        <p className="text-xs">
                          🏍️{" "}
                          {cita.marca_moto === "OTROS"
                            ? `${cita.marca_moto} - ${cita.detalle_marca}`
                            : cita.marca_moto}
                        </p>

                        <p className="text-xs">🪪 {cita.placa}</p>

                        <p className="text-xs">🔧 {cita.motivo_trabajo}</p>

                        <p className="text-xs">📍 {cita.direccion}</p>

                        <Link
                          to={`/admin/citas/${cita.id}`}
                          className="
                        block
                        text-center
                        mt-4
                        bg-[#FF6A00]
                        text-white
                        rounded-lg
                        py-2
                        text-xs
                        font-semibold
                        "
                        >
                          Ver detalle
                        </Link>
                      </div>
                    ) : (
                      <div
                        className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      text-gray-300
                      text-sm
                      "
                      >
                        {cancelada ? "Disponible nuevamente" : "Disponible"}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Calendario;
