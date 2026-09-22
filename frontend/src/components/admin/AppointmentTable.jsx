import { Link } from "react-router-dom";

function AppointmentTable({ citas = [], cargando }) {
  const estadoColor = (estado) => {
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
    <div
      className="
        bg-white
        rounded-xl
        shadow-sm
        border
        border-gray-100
        mt-8
        overflow-hidden
      "
    >
      <div
        className="
          p-5
          border-b
          border-gray-100
        "
      >
        <h3
          className="
            text-xl
            font-bold
            text-gray-800
          "
        >
          Últimas citas
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead
            className="
              bg-gray-50
              text-gray-600
              text-sm
            "
          >
            <tr>
              <th className="px-5 py-4">Cliente</th>

              <th className="px-5 py-4">Moto</th>

              <th className="px-5 py-4">Servicio</th>

              <th className="px-5 py-4">Fecha</th>

              <th className="px-5 py-4">Hora</th>

              <th className="px-5 py-4">Estado</th>

              <th className="px-5 py-4">Acción</th>
            </tr>
          </thead>

          <tbody>
            {cargando ? (
              <tr>
                <td
                  colSpan="7"
                  className="
                      text-center
                      py-6
                    "
                >
                  Cargando citas...
                </td>
              </tr>
            ) : citas.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="
                      text-center
                      py-6
                      text-gray-500
                    "
                >
                  No existen citas registradas
                </td>
              </tr>
            ) : (
              citas.slice(0, 5).map((item) => (
                <tr
                  key={item.id}
                  className="
                      border-t
                      hover:bg-gray-50
                    "
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold">{item.nombre_cliente}</div>

                    <div className="text-sm text-gray-500">{item.telefono}</div>
                  </td>

                  <td className="px-5 py-4">{item.marca_moto}</td>

                  <td className="px-5 py-4">{item.motivo_trabajo}</td>

                  <td className="px-5 py-4">{item.fecha}</td>

                  <td className="px-5 py-4">{item.bloque_hora}</td>

                  <td className="px-5 py-4">
                    <span
                      className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          ${estadoColor(item.estado)}
                        `}
                    >
                      {item.estado}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/admin/citas/${item.id}`}
                      className="
                          text-[#FF6A00]
                          font-semibold
                          hover:underline
                        "
                    >
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentTable;
