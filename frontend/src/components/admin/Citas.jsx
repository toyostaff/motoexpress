import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/axios";

function Citas() {
  const navigate = useNavigate();

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

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Citas</h1>

          <p className="text-gray-500 mt-2">
            Administra las reservas del servicio técnico
          </p>
        </div>

        <div
          className="
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
          "
        >
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
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
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="
            border
            rounded-lg
            px-4
            py-3
            outline-none
            "
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
            className="
            border
            rounded-lg
            px-4
            py-3
            "
          />
        </div>

        <div
          className="
          bg-white
          rounded-xl
          shadow-sm
          border
          border-gray-100
          overflow-hidden
          "
        >
          <table className="w-full">
            <thead
              className="
              bg-gray-50
              text-gray-600
              "
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

            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan="7" className="p-6 text-center">
                    Cargando citas...
                  </td>
                </tr>
              ) : citas.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-gray-500">
                    No existen citas registradas
                  </td>
                </tr>
              ) : (
                citas.map((item) => (
                  <tr
                    key={item.id}
                    className="
                    border-t
                    hover:bg-gray-50
                    "
                  >
                    <td className="p-4">
                      <div className="font-semibold">{item.nombre_cliente}</div>

                      <div className="text-sm text-gray-500">
                        {item.telefono}
                      </div>
                    </td>

                    <td className="p-4">{item.marca_moto}</td>

                    <td className="p-4">{item.motivo_trabajo}</td>

                    <td className="p-4">{item.fecha}</td>

                    <td className="p-4">{item.bloque_hora}</td>

                    <td className="p-4">
                      <span
                        className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        ${estadoStyle(item.estado)}
                        `}
                      >
                        {item.estado}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => navigate(`/admin/citas/${item.id}`)}
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Citas;
