import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/axios";
import { useTheme } from "../../context/ThemeContext";

function Citas() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");

  const [fecha, setFecha] = useState("");
  const [usarFecha, setUsarFecha] = useState(false);

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    return `${año}-${mes}-${dia}`;
  };

  useEffect(() => {
    const fechaHoy = obtenerFechaActual();
    setFecha(fechaHoy);
    cargarCitas();
  }, []);

  useEffect(() => {
    const tiempo = setTimeout(() => {
      cargarCitas();
    }, 400);

    return () => clearTimeout(tiempo);
  }, [busqueda, estado, fecha, usarFecha]);

  const cargarCitas = async () => {
    try {
      setCargando(true);
      const params = new URLSearchParams();

      if (busqueda.trim()) {
        params.append("nombre", busqueda.trim());
      }

      if (estado) {
        params.append("estado", estado);
      }

      if (usarFecha && fecha) {
        params.append("inicio", fecha);
        params.append("fin", fecha);
      }

      const response = await api.get(`/citas?${params.toString()}`);
      setCitas(response.data.data || []);
    } catch (error) {
      console.error("Error cargando citas:", error);
      setCitas([]);
    } finally {
      setCargando(false);
    }
  };

  const estadoStyle = (estadoItem) => {
    switch (estadoItem) {
      case "Pendiente":
        return darkMode
          ? "bg-orange-900/50 text-orange-300 border border-orange-500/30"
          : "bg-orange-100 text-orange-700";

      case "Confirmado":
        return darkMode
          ? "bg-blue-900/50 text-blue-300 border border-blue-500/30"
          : "bg-blue-100 text-blue-700";

      case "Atendido":
        return darkMode
          ? "bg-green-900/50 text-green-300 border border-green-500/30"
          : "bg-green-100 text-green-700";

      case "Cancelado":
        return darkMode
          ? "bg-red-900/50 text-red-300 border border-red-500/30"
          : "bg-red-100 text-red-700";

      case "No realizado":
      default:
        return darkMode
          ? "bg-slate-800 text-gray-300 border border-slate-700"
          : "bg-gray-100 text-gray-700";
    }
  };

  return (
    <AdminLayout>
      <div>
        {/* Encabezado */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Gestión de Citas
          </h1>

          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Administra las reservas del servicio técnico
          </p>
        </div>

        {/* Panel de Filtros */}
        <div
          className={`rounded-xl shadow-sm border p-5 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 transition-colors ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-gray-100"
          }`}
        >
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar cliente..."
            className={`border rounded-lg px-4 py-3 outline-none transition focus:border-[#FF6A00] ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-800"
            }`}
          />

          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className={`border rounded-lg px-4 py-3 outline-none transition ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-white"
                : "bg-white border-gray-300 text-gray-800"
            }`}
          >
            <option value="">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Atendido">Atendido</option>
            <option value="Cancelado">Cancelado</option>
            <option value="No realizado">No realizado</option>
          </select>

          <input
            type="date"
            value={fecha}
            onChange={(e) => {
              setFecha(e.target.value);
              setUsarFecha(true);
            }}
            className={`border rounded-lg px-4 py-3 outline-none transition ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-white [color-scheme:dark]"
                : "bg-white border-gray-300 text-gray-800"
            }`}
          />
        </div>

        {/* Tabla de Citas */}
        <div
          className={`rounded-xl shadow-sm border overflow-hidden transition-colors ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                className={`text-sm transition-colors ${
                  darkMode
                    ? "bg-slate-800/80 text-gray-300"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                <tr>
                  <th className="p-4 text-left">Cliente</th>
                  <th className="p-4 text-left">Moto</th>
                  <th className="p-4 text-left">Servicio</th>
                  <th className="p-4 text-left">Fecha</th>
                  <th className="p-4 text-left">Hora</th>
                  <th className="p-4 text-left">Estado</th>
                  <th className="p-4 text-left">Acción</th>
                </tr>
              </thead>

              <tbody
                className={`divide-y transition-colors ${
                  darkMode ? "divide-slate-800" : "divide-gray-100"
                }`}
              >
                {cargando ? (
                  <tr>
                    <td
                      colSpan="7"
                      className={`p-6 text-center ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Cargando citas...
                    </td>
                  </tr>
                ) : citas.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className={`p-6 text-center ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      No existen citas registradas
                    </td>
                  </tr>
                ) : (
citas.map((item) => (
                        <tr
                      key={item.id}
                      className={`transition-colors ${
                        darkMode
                          ? "hover:bg-slate-800/50 text-gray-200"
                          : "hover:bg-gray-50 text-gray-800"
                      }`}
                    >
                      <td className="p-4">
                        <div
                          className={`font-semibold ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.nombre_cliente}
                        </div>
                        <div
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {item.telefono}
                        </div>
                      </td>

                      <td className="p-4">{item.marca_moto}</td>

                      <td className="p-4">{item.motivo_trabajo}</td>

                      <td className="p-4">{item.fecha}</td>

                      <td className="p-4">{item.bloque_hora}</td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${estadoStyle(
                            item.estado,
                          )}`}
                        >
                          {item.estado}
                        </span>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => navigate(`/admin/citas/${item.id}`)}
                          className="text-[#FF6A00] font-semibold hover:underline"
                        >
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Citas;
