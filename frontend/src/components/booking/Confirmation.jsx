import { useState } from "react";

import api from "../../api/axios";

import ExitBookingModal from "./ExitBookingModal";

import BookingSuccessModal from "./BookingSuccessModal";

function Confirmation({
  formData,

  previousStep,
}) {
  const [showExitModal, setShowExitModal] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  async function submit() {
    try {
      const response = await api.post("/citas/agendar", formData);

      if (response.data.ok) {
        setShowSuccessModal(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error al registrar la cita");
    }
  }








  
  return (
    <div>
      <h2
        className="
                text-2xl
                font-bold
                text-[#0B1115]
                "
      >
        Confirma tu cita
      </h2>

      <p
        className="
                text-gray-500
                mt-2
                "
      >
        Revisa tus datos antes de registrar tu solicitud.
      </p>

      <div
        className="
                mt-6
                space-y-4
                "
      >
        <div
          className="
                    border
                    rounded-xl
                    p-5
                    "
        >
          <h3
            className="
                        font-bold
                        mb-3
                        "
          >
            👤 Datos del cliente
          </h3>

          <p>{formData.nombre_cliente}</p>
          <p>{formData.telefono}</p>
          <p>{formData.direccion}</p>

          {formData.referencia && <p>{formData.referencia}</p>}
        </div>

        <div
          className="
                    border
                    rounded-xl
                    p-5
                    "
        >
          <h3
            className="
                        font-bold
                        mb-3
                        "
          >
            🏍️ Datos de la moto
          </h3>

          <p>Marca: {formData.marca_moto}</p>

          {formData.detalle_marca && <p>Modelo: {formData.detalle_marca}</p>}

          <p>Placa: {formData.placa}</p>
        </div>

        <div
          className="
                    border
                    rounded-xl
                    p-5
                    "
        >
          <h3
            className="
                        font-bold
                        mb-3
                        "
          >
            🔧 Servicio solicitado
          </h3>

          <p>{formData.motivo_trabajo}</p>

          {formData.detalle_motivo && <p>{formData.detalle_motivo}</p>}
        </div>

        <div
          className="
                    border
                    border-orange-300
                    bg-orange-50
                    rounded-xl
                    p-5
                    "
        >
          <h3
            className="
                        font-bold
                        mb-3
                        "
          >
            📅 Fecha y horario
          </h3>

          <p>{formData.fecha}</p>

          <p
            className="
                        font-bold
                        mt-2
                        "
          >
            🕒 {formData.bloque_hora}
          </p>
        </div>
      </div>

      <div
        className="
                flex
                flex-col
                gap-4
                mt-10
                "
      >
        <div
          className="
                    flex
                    justify-between
                    items-center
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
              onClick={submit}
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
              Confirmar cita
            </button>
          </div>
        </div>
      </div>

      <ExitBookingModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
      />

      <BookingSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          window.location.href = "/";
        }}
      />
    </div>
  );
}

export default Confirmation;
