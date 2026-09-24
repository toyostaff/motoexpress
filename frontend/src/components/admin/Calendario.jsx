import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/axios";
import { useTheme } from "../../context/ThemeContext";

function Calendario() {
  const { darkMode } = useTheme();

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
          tarjeta: darkMode
            ? "bg-orange-950/40 border-orange-500/40 text-orange-200"
            : "bg-orange-50 border-orange-200 text-gray-800",
          badge: darkMode
            ? "bg-orange-900/60 text-orange-300 border border-orange-500/30"
            : "bg-orange-200 text-orange-800",
        };

      case "Confirmado":
        return {
          tarjeta: darkMode
            ? "bg-blue-950/40 border-blue-500/40 text-blue-200"
            : "bg-blue-50 border-blue-200 text-gray-800",
          badge: darkMode
            ? "bg-blue-900/60 text-blue-300 border border-blue-500/30"
            : "bg-blue-200 text-blue-800",
        };

      case "Atendido":
        return {
          tarjeta: darkMode
            ? "bg-green-950/40 border-green-500/40 text-green-200"
            : "bg-green-50 border-green-200 text-gray-800",
          badge: darkMode
            ? "bg-green-900/60 text-green-300 border border-green-500/30"
            : "bg-green-200 text-green-800",
        };

      case "Cancelado":
        return {
          tarjeta: darkMode
            ? "bg-red-950/40 border-red-500/40 text-red-200"
            : "bg-red-50 border-red-200 text-gray-800",
          badge: darkMode
            ? "bg-red-900/60 text-red-300 border border-red-500/30"
            : "bg-red-200 text-red-800",
        };

      default:
        return {
          tarjeta: darkMode
            ? "bg-slate-800/50 border-slate-700 text-gray-300"
            : "bg-gray-50 border-gray-200 text-gray-800",
          badge: darkMode
            ? "bg-gray-800 text-gray-300"
            : "bg-gray-200 text-gray-700",
        };
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1
          className={`text-3xl font-bold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Calendario
        </h1>

        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Agenda diaria del taller MotoExpress.
        </p>

        {/* Filtro de Fecha */}
        <div
          className={`rounded-xl shadow-sm border p-6 mt-8 transition-colors ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-gray-100"
          }`}
        >
          <label
            className={`block text-sm font-semibold mb-2 ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Seleccionar fecha
          </label>

          <input
            type="date"
            value={fecha}
            onChange={cambiarFecha}
            className={`border rounded-lg px-4 py-3 outline-none transition ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-white [color-scheme:dark]"
                : "bg-white border-gray-300 text-gray-800"
            }`}
          />
        </div>

        {/* Contenedor Principal de la Agenda */}
        <div
          className={`rounded-xl shadow-sm border p-6 mt-6 transition-colors ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-gray-100"
          }`}
        >
          <h2
            className={`text-xl font-bold mb-5 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Agenda del Taller
          </h2>

          {/* Tarjetas Resumen */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div
              className={`border rounded-lg p-4 ${
                darkMode
                  ? "bg-slate-800/80 border-slate-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <p
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Total horarios
              </p>
              <p
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {resumen.total}
              </p>
            </div>

            <div
              className={`border rounded-lg p-4 ${
                darkMode
                  ? "bg-green-950/30 border-green-800/50"
                  : "bg-green-50 border-green-200"
              }`}
            >
              <p
                className={`text-sm ${darkMode ? "text-green-400" : "text-green-700"}`}
              >
                Disponibles
              </p>
              <p
                className={`text-2xl font-bold ${
                  darkMode ? "text-green-300" : "text-green-700"
                }`}
              >
                {resumen.disponibles}
              </p>
            </div>

            <div
              className={`border rounded-lg p-4 ${
                darkMode
                  ? "bg-orange-950/30 border-orange-800/50"
                  : "bg-orange-50 border-orange-200"
              }`}
            >
              <p
                className={`text-sm ${darkMode ? "text-orange-400" : "text-orange-700"}`}
              >
                Pendientes
              </p>
              <p
                className={`text-2xl font-bold ${
                  darkMode ? "text-orange-300" : "text-orange-700"
                }`}
              >
                {resumen.pendientes}
              </p>
            </div>

            <div
              className={`border rounded-lg p-4 ${
                darkMode
                  ? "bg-blue-950/30 border-blue-800/50"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <p
                className={`text-sm ${darkMode ? "text-blue-400" : "text-blue-700"}`}
              >
                Confirmadas
              </p>
              <p
                className={`text-2xl font-bold ${
                  darkMode ? "text-blue-300" : "text-blue-700"
                }`}
              >
                {resumen.confirmadas}
              </p>
            </div>

            <div
              className={`border rounded-lg p-4 ${
                darkMode
                  ? "bg-emerald-950/30 border-emerald-800/50"
                  : "bg-emerald-50 border-emerald-200"
              }`}
            >
              <p
                className={`text-sm ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}
              >
                Atendidas
              </p>
              <p
                className={`text-2xl font-bold ${
                  darkMode ? "text-emerald-300" : "text-emerald-700"
                }`}
              >
                {resumen.atendidas}
              </p>
            </div>
          </div>

          {/* Grid de Bloques Horarios */}
          {cargando ? (
            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              Cargando agenda...
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {horarios.map((hora) => {
                const cita = obtenerCitaHora(hora);
                const cancelada = tieneCancelada(hora);

                return (
                  <div
                    key={hora}
                    className={`border rounded-xl p-4 h-[280px] flex flex-col transition-colors ${
                      darkMode
                        ? "bg-slate-800/40 border-slate-700/80"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3
                        className={`font-bold text-sm ${
                          darkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        {hora}
                      </h3>

                      {cita && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            colorEstado(cita.estado).badge
                          }`}
                        >
                          {cita.estado}
                        </span>
                      )}
                    </div>

                    {cita ? (
                      <div
                        className={`border rounded-xl p-3 flex-1 flex flex-col justify-between ${
                          colorEstado(cita.estado).tarjeta
                        }`}
                      >
                        <div className="space-y-1">
                          <p
                            className={`font-bold text-sm truncate ${
                              darkMode ? "text-white" : "text-gray-800"
                            }`}
                          >
                            👤 {cita.nombre_cliente}
                          </p>

                          <p
                            className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            📞 {cita.telefono}
                          </p>

                          <p
                            className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            🏍️{" "}
                            {cita.marca_moto === "OTROS"
                              ? `${cita.marca_moto} - ${cita.detalle_marca}`
                              : cita.marca_moto}
                          </p>

                          <p
                            className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            🪪 {cita.placa}
                          </p>

                          <p
                            className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            🔧 {cita.motivo_trabajo}
                          </p>

                          <p
                            className={`text-xs truncate ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            📍 {cita.direccion}
                          </p>
                        </div>

                        <Link
                          to={`/admin/citas/${cita.id}`}
                          className="block text-center mt-2 bg-[#FF6A00] hover:bg-[#e05d00] text-white rounded-lg py-1.5 text-xs font-semibold transition"
                        >
                          Ver detalle
                        </Link>
                      </div>
                    ) : (
                      <div
                        className={`flex flex-1 items-center justify-center text-sm ${
                          darkMode ? "text-slate-500" : "text-gray-300"
                        }`}
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
