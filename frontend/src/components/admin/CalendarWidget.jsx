function CalendarWidget() {
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  const hours = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const status = [
    "Disponible",
    "Reservado",
    "Disponible",
    "Reservado",
    "Bloqueado",
    "Disponible",
  ];

  const getStatusStyle = (estado) => {
    switch (estado) {
      case "Disponible":
        return "bg-green-100 text-green-700";

      case "Reservado":
        return "bg-orange-100 text-orange-700";

      case "Bloqueado":
        return "bg-red-100 text-red-700";

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
        p-5
      "
    >
      <div
        className="
          flex
          justify-between
          items-center
          mb-5
        "
      >
        <div>
          <h3
            className="
              text-xl
              font-bold
              text-gray-800
            "
          >
            Calendario de disponibilidad
          </h3>

          <p
            className="
              text-gray-500
              text-sm
            "
          >
            Horarios de atención del taller
          </p>
        </div>

        <button
          className="
            bg-[#FF6A00]
            text-white
            px-4
            py-2
            rounded-lg
            text-sm
            hover:bg-orange-600
          "
        >
          Gestionar horarios
        </button>
      </div>

      <div className="overflow-x-auto">
        <table
          className="
            w-full
            border-collapse
          "
        >
          <thead>
            <tr
              className="
                bg-gray-50
                text-gray-600
              "
            >
              <th
                className="
                  p-3
                  text-left
                "
              >
                Hora
              </th>

              {days.map((day, index) => (
                <th key={index} className="p-3">
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {hours.map((hour, index) => (
              <tr
                key={index}
                className="
                  border-t
                "
              >
                <td
                  className="
                    p-3
                    font-semibold
                    text-gray-700
                  "
                >
                  {hour}
                </td>

                {days.map((_, dayIndex) => (
                  <td key={dayIndex} className="p-2">
                    <span
                      className={`
                        block
                        text-center
                        text-xs
                        font-semibold
                        rounded-lg
                        py-2
                        ${getStatusStyle(
                          status[(index + dayIndex) % status.length],
                        )}
                      `}
                    >
                      {status[(index + dayIndex) % status.length]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CalendarWidget;
