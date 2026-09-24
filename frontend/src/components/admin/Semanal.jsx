import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/axios";
import { useTheme } from "../../context/ThemeContext";

function Semanal() {
  const { darkMode } = useTheme();

  const [fechaSemana, setFechaSemana] = useState(new Date());
  const [citas, setCitas] = useState([]);
  const [detalleCitas, setDetalleCitas] = useState({});

  const [cargando, setCargando] = useState(false);

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

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

  useEffect(() => {
    cargarAgenda();
  }, [fechaSemana]);

  function obtenerLunes(fecha) {
    const dia = fecha.getDay();
    const diferencia = dia === 0 ? -6 : 1 - dia;
    const lunes = new Date(fecha);
    lunes.setDate(fecha.getDate() + diferencia);
    return lunes;
  }

  function formatoFecha(fecha) {
    return fecha.toISOString().split("T")[0];
  }

  async function cargarAgenda() {
    try {
      setCargando(true);
      const lunes = obtenerLunes(fechaSemana);
      const fechasSemana = [];

      for (let i = 0; i < 6; i++) {
        const fecha = new Date(lunes);
        fecha.setDate(lunes.getDate() + i);
        fechasSemana.push(formatoFecha(fecha));
      }

      const response = await api.get(`/citas`);
      const data = response.data.data || [];

      setCitas(
        data.filter((item) => {
          const fechaCita = item.fecha.substring(0, 10);
          return (
            fechasSemana.includes(fechaCita) &&
            (item.estado === "Pendiente" ||
              item.estado === "Confirmado" ||
              item.estado === "Atendido")
          );
        })
      );

      const completas = {};
      for (const cita of data) {
        if (
          fechasSemana.includes(cita.fecha.substring(0, 10)) &&
          cita.estado !== "Cancelado"
        ) {
          try {
            const detalle = await api.get(`/citas/${cita.id}`);
            completas[cita.id] = detalle.data.data;
          } catch (error) {
            console.error("Error detalle cita", cita.id);
          }
        }
      }
      setDetalleCitas(completas);
    } catch (error) {
      console.error("Error cargando agenda", error);
      setCitas([]);
    } finally {
      setCargando(false);
    }
  }

  function cambiarSemana(valor) {
    const nueva = new Date(fechaSemana);
    nueva.setDate(nueva.getDate() + valor * 7);
    setFechaSemana(nueva);
  }

  function obtenerFechaDia(index) {
    const lunes = obtenerLunes(fechaSemana);
    const fecha = new Date(lunes);
    fecha.setDate(lunes.getDate() + index);
    return formatoFecha(fecha);
  }

  function buscarCita(fecha, hora) {
    return citas.find(
      (item) =>
        item.fecha.substring(0, 10) === fecha && item.bloque_hora === hora
    );
  }

  function estiloEstado(estado) {
    switch (estado) {
      case "Pendiente":
        return darkMode
          ? "bg-orange-900/50 border-orange-500 text-orange-100"
          : "bg-orange-100 border-orange-400 text-orange-900";

      case "Confirmado":
        return darkMode
          ? "bg-blue-900/50 border-blue-500 text-blue-100"
          : "bg-blue-100 border-blue-400 text-blue-900";

      case "Atendido":
        return darkMode
          ? "bg-green-900/50 border-green-500 text-green-100"
          : "bg-green-100 border-green-400 text-green-900";

      default:
        return "";
    }
  }

  function nombreSemana() {
    const lunes = obtenerLunes(fechaSemana);
    const sabado = new Date(lunes);
    sabado.setDate(lunes.getDate() + 5);

    return `${lunes.getDate()} - ${sabado.getDate()} ${sabado.toLocaleDateString(
      "es-PE",
      {
        month: "long",
        year: "numeric",
      }
    )}`;
  }

  const btnNavegacionEstilo = `px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm ${
    darkMode
      ? "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300"
  }`;

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Agenda semanal
            </h1>

            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Semana {nombreSemana()}
            </p>
            <div
              className={`mt-3 inline-flex px-4 py-2 rounded-lg font-semibold ${
                darkMode
                  ? "bg-orange-900/40 text-orange-300"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              📅 {citas.length} citas
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => cambiarSemana(-1)}
              className={btnNavegacionEstilo}
              title="Semana anterior"
            >
              ◀
            </button>

            <button
              onClick={() => cambiarSemana(1)}
              className={btnNavegacionEstilo}
              title="Semana siguiente"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl">
          <table className="w-full border-collapse">
            <thead>
              <tr
                className={`${
                  darkMode ? "bg-slate-800 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <th
                  className={`p-3 font-semibold ${
                    darkMode ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Hora
                </th>

                {dias.map((dia, index) => {
                  const fecha = obtenerFechaDia(index);
                  const fechaObj = new Date(fecha);
                  const esHoy = fecha === formatoFecha(new Date());

                  return (
                    <th
                      key={dia}
                      className={`p-3 text-center font-semibold ${
                        esHoy
                          ? "bg-orange-500 text-white rounded-lg"
                          : darkMode
                          ? "text-gray-200"
                          : "text-gray-800"
                      }`}
                    >
                      <div>{dia}</div>

                      <div className="text-xs mt-1">
                        {fechaObj.getDate()}{" "}
                        {fechaObj.toLocaleDateString("es-PE", {
                          month: "short",
                        })}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {horarios.map((hora) => (
                <tr
                  key={hora}
                  className={`border-t ${
                    darkMode ? "border-slate-800" : "border-gray-200"
                  }`}
                >
                  <td
                    className={`p-3 font-semibold whitespace-nowrap ${
                      darkMode ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    {hora}
                  </td>

                  {dias.map((_, index) => {
                    const fecha = obtenerFechaDia(index);
                    const cita = buscarCita(fecha, hora);

                    return (
                      <td key={index} className="p-2 min-w-[180px] h-32">
                        {cita && (
                          <Link
                            to={`/admin/citas/${cita.id}`}
                            className={`block h-28 w-full rounded-xl border p-3 shadow-sm overflow-hidden transition hover:shadow-lg ${estiloEstado(
                              cita.estado
                            )}`}
                          >
                            <div className="flex justify-between items-start gap-3">
                              <span className="font-bold text-sm truncate max-w-[120px]">
                                {cita.nombre_cliente}
                              </span>
                              <span
                                className={`text-xs font-bold px-3 py-1 rounded-md border shadow-sm ${
                                  darkMode
                                    ? "bg-slate-900 text-white border-slate-700"
                                    : "bg-orange-500 text-white border-orange-600"
                                }`}
                              >
                                {detalleCitas[cita.id]?.placa || ""}
                              </span>
                            </div>

                            <p className="text-xs mt-2">{cita.bloque_hora}</p>

                            <p className="text-sm mt-2 truncate">
                              {cita.motivo_trabajo}
                            </p>

                            <p className="text-xs text-right mt-1 font-bold">
                              {cita.estado}
                            </p>
                          </Link>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Semanal;