import { useState } from "react";
import ExitBookingModal from "./ExitBookingModal";

const services = [
  {
    value: "Cambio de aceite",
    icon: "🔧",
  },
  {
    value: "Revision de frenos",
    icon: "🛞",
  },
  {
    value: "Revision de luces",
    icon: "💡",
  },
  {
    value: "Revision de bateria",
    icon: "🪫",
  },
  {
    value: "Otros",
    icon: "➕",
  },
];

function ServiceForm({ formData, setFormData, nextStep, previousStep }) {
  const [showExitModal, setShowExitModal] = useState(false);
  const [error, setError] = useState("");

  function selectService(service) {
    setError("");

    setFormData({
      ...formData,
      motivo_trabajo: service,
    });
  }

  function handleNext() {
    if (!formData.motivo_trabajo) {
      setError("Selecciona un servicio para continuar");
      return;
    }

    if (
      formData.motivo_trabajo === "Otros" &&
      !formData.detalle_motivo?.trim()
    ) {
      setError("Especifica el servicio requerido");
      return;
    }

    setError("");
    nextStep();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0B1115]">
        Que servicio necesita tu moto?
      </h2>

      <p className="text-gray-500 mt-2">Selecciona el servicio requerido</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
        {services.map((service) => (
          <button
            key={service.value}
            type="button"
            onClick={() => selectService(service.value)}
            className={`p-6 border rounded-xl text-center transition ${
              formData.motivo_trabajo === service.value
                ? "border-orange-500 bg-orange-50"
                : "hover:border-orange-400"
            }`}
          >
            <div className="text-4xl">{service.icon}</div>
            <div className="font-bold mt-3">{service.value}</div>
          </button>
        ))}
      </div>

      {formData.motivo_trabajo === "Otros" && (
        <input
          name="detalle_motivo"
          value={formData.detalle_motivo || ""}
          onChange={(e) => {
            setError("");
            setFormData({
              ...formData,
              detalle_motivo: e.target.value,
            });
          }}
          placeholder="Detalle del servicio requerido"
          className="mt-6 w-full border rounded-lg px-4 py-3"
        />
      )}

      <div className="flex flex-col gap-4 mt-10">
        {error && <p className="text-red-500 font-medium mb-4">{error}</p>}

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => setShowExitModal(true)}
            className="text-gray-600 hover:text-orange-500 font-medium"
          >
            ← Volver al inicio
          </button>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={previousStep}
              className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 font-medium"
            >
              ← Anterior
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold"
            >
              Siguiente →
            </button>
          </div>
        </div>
      </div>

      <ExitBookingModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
      />
    </div>
  );
}

export default ServiceForm;