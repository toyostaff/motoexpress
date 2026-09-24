import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function AppointmentTable({ citas = [], cargando }) {
  const { darkMode } = useTheme();
  const [pagina, setPagina] = useState(1);

const porPagina = 10;

const citasOrdenadas = [...citas].sort(
  (a,b) => b.id - a.id
);

const totalPaginas = Math.ceil(
  citasOrdenadas.length / porPagina
);

const citasMostrar = citasOrdenadas.slice(
  (pagina - 1) * porPagina,
  pagina * porPagina
);


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
      className={`
        rounded-xl
        shadow-sm
        border
        mt-8
        overflow-hidden

        ${
          darkMode
            ? "bg-slate-900 border-slate-700"
            : "bg-white border-gray-100"
        }

      `}
    >
      <div
        className={`
          p-5
          border-b

          ${darkMode ? "border-slate-700" : "border-gray-100"}

        `}
      >
        <h3
          className={`
            text-xl
            font-bold

            ${darkMode ? "text-white" : "text-gray-800"}

          `}
        >
          Últimas citas
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead
            className={`
              text-sm

              ${
                darkMode
                  ? "bg-slate-800 text-gray-300"
                  : "bg-gray-50 text-gray-600"
              }

            `}
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
            ) :(
  citasMostrar.map((item) => (
                  <tr
                    key={item.id}
                    className={`
                    border-t

                    ${
                      darkMode
                        ? "border-slate-700 hover:bg-slate-800"
                        : "hover:bg-gray-50"
                    }

                  `}
                  >
                    <td className="px-5 py-4">
                      <div
                        className={`
                        font-semibold

                        ${darkMode ? "text-white" : "text-gray-800"}

                      `}
                      >
                        {item.nombre_cliente}
                      </div>

                      <div
                        className={`
                        text-sm

                        ${darkMode ? "text-gray-400" : "text-gray-500"}

                      `}
                      >
                        {item.telefono}
                      </div>
                    </td>

                    <td
                      className={`
                      px-5
                      py-4

                      ${darkMode ? "text-gray-300" : "text-gray-700"}

                    `}
                    >
                      {item.marca_moto}
                    </td>

                    <td
                      className={`
                      px-5
                      py-4

                      ${darkMode ? "text-gray-300" : "text-gray-700"}

                    `}
                    >
                      {item.motivo_trabajo}
                    </td>

                    <td
                      className={`
                      px-5
                      py-4

                      ${darkMode ? "text-gray-300" : "text-gray-700"}

                    `}
                    >
                      {item.fecha}
                    </td>

                    <td
                      className={`
                      px-5
                      py-4

                      ${darkMode ? "text-gray-300" : "text-gray-700"}

                    `}
                    >
                      {item.bloque_hora}
                    </td>

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

<div className="
flex
justify-end
items-center
gap-4
p-5
">

<button
disabled={pagina === 1}
onClick={() => setPagina(pagina - 1)}
className="
px-4
py-2
rounded-lg
bg-gray-600
disabled:opacity-50
"
>
Anterior
</button>


<span className="
font-semibold
">
Página {pagina} de {totalPaginas}
</span>


<button
disabled={pagina === totalPaginas}
onClick={() => setPagina(pagina + 1)}
className="
px-4
py-2
rounded-lg
bg-[#FF6A00]
text-white
disabled:opacity-50
"
>
Siguiente
</button>


</div>

</div>
    </div>
  );
}

export default AppointmentTable;
