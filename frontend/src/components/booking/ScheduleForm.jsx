import { useEffect, useState } from "react";

import api from "../../api/axios";

import ExitBookingModal from "./ExitBookingModal";

function ScheduleForm({
  formData,

  setFormData,

  nextStep,

  previousStep,
}) {
  const [showExitModal, setShowExitModal] = useState(false);

  const [available, setAvailable] = useState([]);

  const [error, setError] = useState("");

  const hours = [
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

  async function loadAvailability(fecha) {
    if (!fecha) {
      setAvailable([]);

      return;
    }

    try {
      const response = await api.get(`/citas/ocupados?fecha=${fecha}`);

      setAvailable(response.data.disponibles);
    } catch (error) {
      console.error(error);

      setAvailable([]);

      setError("No se pudo cargar la disponibilidad");
    }
  }

  useEffect(() => {
    loadAvailability(formData.fecha);
  }, []);

  async function changeDate(e) {
    const fecha = e.target.value;

    setFormData({
      ...formData,

      fecha,

      bloque_hora: "",
    });

    setError("");

    await loadAvailability(fecha);
  }

function isPastHour(hour) {
  if (!formData.fecha) return false;

  const today = new Date();
  const selectedDate = new Date(formData.fecha);

  const isToday =
    today.toISOString().split("T")[0] === formData.fecha;

  if (!isToday) return false;

  const currentHour = today.getHours();

  const hourStart = parseInt(hour.split(":")[0]);

  return hourStart <= currentHour;
}




  function selectHour(hour) {
    setError("");

    setFormData({
      ...formData,

      bloque_hora: formData.bloque_hora === hour ? "" : hour,
    });
  }

  function handleNext() {
    if (!formData.bloque_hora) {
      setError("Selecciona un horario para continuar");

      return;
    }

    nextStep();
  }

  return (
    <div>
      <ExitBookingModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
      />

      <h2
        className="
        text-2xl
        font-bold
        text-[#0B1115]
        "
      >
        Selecciona fecha y horario
      </h2>

      <p
        className="
        text-gray-500
        mt-2
        "
      >
        Elige el día y horario disponible para tu mantenimiento.
      </p>

      <div
        className="
        mt-8
        "
      >
        <label
          className="
          block
          font-semibold
          mb-3
          "
        >
          Fecha de atención
        </label>

        <input
          type="date"
          value={formData.fecha || ""}
          onChange={changeDate}
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
        mt-8
        "
      >
        <h3
          className="
          font-semibold
          mb-4
          "
        >
          Horarios disponibles
        </h3>

        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-3
          gap-4
          "
        >
          {hours.map((hour) => {
const isAvailable =
  available.includes(hour) && !isPastHour(hour);
  
            const isSelected = formData.bloque_hora === hour;

            return (
              <button
                key={hour}
                type="button"
                disabled={!isAvailable}
                onClick={() => selectHour(hour)}
                className={`

                h-24

                rounded-xl

                border-2

                flex

                flex-col

                items-center

                justify-center

                transition-all


                ${
                  isSelected
                    ? "bg-orange-500 border-orange-500 text-white shadow-lg"
                    : isAvailable
                      ? "bg-white border-gray-200 hover:border-orange-500"
                      : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                }


                `}
              >
                <span className="text-xl">{isAvailable ? "🕒" : "🔒"}</span>

                <span className="font-bold">{hour}</span>

                <span className="text-xs">
                  {isSelected
                    ? "Seleccionado"
                    : isAvailable
                      ? "Disponible"
                      : "No disponible"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <p
          className="
            text-red-500
            mt-5
            font-medium
            "
        >
          {error}
        </p>
      )}

      <div
        className="
        flex
        justify-between
        items-center
        mt-10
        "
      >
        <button
          type="button"
          onClick={() => setShowExitModal(true)}
          className="
          text-gray-600
          hover:text-orange-500
          font-medium
          "
        >
          ← Volver al inicio
        </button>

        <div
          className="
          flex
          gap-4
          "
        >
          <button
            type="button"
            onClick={previousStep}
            className="
            px-6
            py-3
            rounded-lg
            border
            border-gray-300
            hover:bg-gray-100
            font-medium
            "
          >
            ← Anterior
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="
            px-8
            py-3
            rounded-lg
            bg-orange-500
            hover:bg-orange-600
            text-white
            font-bold
            "
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleForm;
