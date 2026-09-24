import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminLayout from "../layouts/AdminLayout";
import StatCard from "../components/admin/StatCard";
import AppointmentTable from "../components/admin/AppointmentTable";
import { useTheme } from "../context/ThemeContext";

function Dashboard() {
  const { darkMode } = useTheme();

  const [citas, setCitas] = useState([]);
  const [stats, setStats] = useState({
    pendientes: 0,
    confirmadas: 0,
    atendidas: 0,
    canceladas: 0,
  });

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDashboard();
  }, []);

  async function cargarDashboard() {
    try {
      const response = await api.get("/citas");
      const data = response.data.data || [];

      setCitas(data);

      setStats({
        pendientes: data.filter((item) => item.estado === "Pendiente").length,
        confirmadas: data.filter((item) => item.estado === "Confirmado").length,
        atendidas: data.filter((item) => item.estado === "Atendido").length,
        canceladas: data.filter((item) => item.estado === "Cancelado").length,
      });
    } catch (error) {
      console.error("Error cargando dashboard:", error);
    } finally {
      setCargando(false);
    }
  }

  return (
    <AdminLayout>
      <h2
        className={`text-3xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Resumen general
      </h2>

      <p
        className={`mt-2 mb-6 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
      >
        Estado actual del servicio MotoExpress
      </p>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Pendientes"
          value={stats.pendientes}
          icon="📅"
          iconBg={darkMode ? "bg-orange-900/40" : "bg-orange-100"}
        />

        <StatCard
          title="Confirmadas"
          value={stats.confirmadas}
          icon="✅"
          iconBg={darkMode ? "bg-blue-900/40" : "bg-blue-100"}
        />

        <StatCard
          title="Atendidas"
          value={stats.atendidas}
          icon="🔧"
          iconBg={darkMode ? "bg-green-900/40" : "bg-green-100"}
        />

        <StatCard
          title="Canceladas"
          value={stats.canceladas}
          icon="❌"
          iconBg={darkMode ? "bg-red-900/40" : "bg-red-100"}
        />
      </div>

      {/* Tabla de Citas */}
      <AppointmentTable citas={citas} cargando={cargando} />

      {/* Widget de Calendario */}
    </AdminLayout>
  );
}

export default Dashboard;
