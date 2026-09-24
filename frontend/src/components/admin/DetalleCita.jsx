import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/axios";
import { useTheme } from "../../context/ThemeContext";

function DetalleCita() {
  const { id } = useParams();
  const { darkMode } = useTheme();

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
      console.error("Error cargando cita:", error);
    } finally {
      setCargando(false);
    }
  };

  const cambiarEstado = async (estado) => {
    if (estado === "Cancelado") {
      const confirmar = window.confirm("¿Está seguro de cancelar esta cita?");
      if (!confirmar) return;
    }

    try {
await api.put(`/citas/${id}/estado`, { estado });
      cargarCita();
    } catch (error) {
      console.error("Error actualizando estado:", error);
    }
  };

  const estadoStyle = (estado) => {
    switch (estado) {
      case "Pendiente":
        return darkMode
          ? "bg-orange-900/40 text-orange-300 border border-orange-500/30"
          : "bg-orange-100 text-orange-700 border border-orange-200";

      case "Confirmado":
        return darkMode
          ? "bg-blue-900/40 text-blue-300 border border-blue-500/30"
          : "bg-blue-100 text-blue-700 border border-blue-200";

      case "Atendido":
        return darkMode
          ? "bg-green-900/40 text-green-300 border border-green-500/30"
          : "bg-green-100 text-green-700 border border-green-200";

      case "Cancelado":
        return darkMode
          ? "bg-red-900/40 text-red-300 border border-red-500/30"
          : "bg-red-100 text-red-700 border border-red-200";

      default:
        return darkMode
          ? "bg-gray-800 text-gray-300 border border-gray-700"
          : "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  if (cargando) {
    return (
      <AdminLayout>
        <div className={`p-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
          Cargando información...
        </div>
      </AdminLayout>
    );
  }

  if (!cita) {
    return (
      <AdminLayout>
        <div className={`p-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
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
      <div className={darkMode ? "text-white" : "text-gray-800"}>
        <div className="flex justify-between items-start mb-8">
          <div>
            <Link
              to="/admin/citas"
              className="text-[#FF6A00] font-semibold text-sm hover:underline"
            >
              ← Volver a citas
            </Link>

            <h1
              className={`text-3xl font-bold mt-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Detalle de Cita
            </h1>

            <p
              className={`mt-2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Información completa del servicio solicitado
            </p>
          </div>

          <span
            className={`px-4 py-2 rounded-full font-semibold ${estadoStyle(
              cita.estado
            )}`}
          >
            {cita.estado}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card titulo="👤 Cliente" darkMode={darkMode}>
            <Info label="Nombre" value={cita.nombre_cliente} darkMode={darkMode} />
            <Info label="Teléfono" value={cita.telefono} darkMode={darkMode} />
            <Info label="Dirección" value={cita.direccion} darkMode={darkMode} />
            <Info label="Referencia" value={cita.referencia} darkMode={darkMode} />
          </Card>

          <Card titulo="🏍 Moto" darkMode={darkMode}>
            <Info label="Marca" value={cita.marca_moto} darkMode={darkMode} />
            <Info label="Placa" value={cita.placa} darkMode={darkMode} />
          </Card>

          <Card titulo="🔧 Servicio" darkMode={darkMode}>
            <Info label="Servicio solicitado" value={cita.motivo_trabajo} darkMode={darkMode} />
            <Info label="Detalle" value={cita.detalle_motivo} darkMode={darkMode} />
          </Card>

          <Card titulo="📅 Programación" darkMode={darkMode}>
            <Info label="Fecha" value={cita.fecha} darkMode={darkMode} />
            <Info label="Horario" value={cita.bloque_hora} darkMode={darkMode} />
            <Info label="Turno" value={cita.turno} darkMode={darkMode} />
          </Card>
        </div>

        <div
          className={`rounded-xl shadow-sm border p-6 mt-8 transition-colors ${
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
            Acciones de la cita
          </h2>

          <div className="flex flex-wrap gap-4">
            <button
              disabled={estadoFinal}
              onClick={() => cambiarEstado("Confirmado")}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              Confirmar
            </button>

            <button
              disabled={estadoFinal}
              onClick={() => cambiarEstado("Atendido")}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              Finalizar
            </button>

            <button
              disabled={estadoFinal}
              onClick={() => cambiarEstado("Cancelado")}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function Card({ titulo, children, darkMode }) {
  return (
    <div
      className={`rounded-xl shadow-sm border p-6 transition-colors ${
        darkMode
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-gray-100 text-gray-900"
      }`}
    >
      <h2
        className={`text-xl font-bold mb-5 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        {titulo}
      </h2>

      {children}
    </div>
  );
}

function Info({ label, value, darkMode }) {
  return (
    <div className="mb-4">
      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        {label}
      </p>

      <p className={`font-semibold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
        {value || "-"}
      </p>
    </div>
  );
}

export default DetalleCita;