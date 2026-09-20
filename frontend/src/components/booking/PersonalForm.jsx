import { useState } from "react";
import ExitBookingModal from "./ExitBookingModal";

function PersonalForm({ formData, setFormData, nextStep }) {
  const [showExitModal, setShowExitModal] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "nombre_cliente") {
      newValue = value.toUpperCase();
    }

    if (name === "telefono") {
      newValue = value.replace(/\D/g, "").slice(0, 9);
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  }

  // Corrección 3: Validación exacta de handleNext
  function handleNext() {
    if (!formData.nombre_cliente.trim()) {
      setError("Ingresa tu nombre completo");
      return;
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(formData.nombre_cliente)) {
      setError("El nombre solo debe contener letras");
      return;
    }

    if (!/^[0-9]{9}$/.test(formData.telefono)) {
      setError("El teléfono debe tener 9 números");
      return;
    }

    if (!formData.direccion.trim()) {
      setError("Ingresa una dirección");
      return;
    }

    setError("");
    nextStep();
  }

  return (
    <div>
      <ExitBookingModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
      />

      <h2 className="text-2xl font-bold text-[#0B1115]">
        Tus datos personales
      </h2>

      <p className="text-gray-500 mt-2">
        Completa la información para continuar
      </p>

      <div className="mt-8 space-y-5">
        <div>
          <label className="block font-semibold mb-2">
            Nombre completo *
          </label>
          <input
            name="nombre_cliente"
            value={formData.nombre_cliente}
            onChange={handleChange}
            placeholder="Ej. Juan Perez Garcia"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Telefono *
          </label>
          <input
            type="tel"
            inputMode="numeric"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Ej. 987654321"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Direccion *
          </label>
          <input
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Ej. Av. Los Olivos 123"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Referencia
          </label>
          <input
            name="referencia"
            value={formData.referencia}
            onChange={handleChange}
            placeholder="Ej. Cerca al parque"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Corrección 2: Mensaje de error agregado antes de los botones */}
      {error && (
        <p className="text-red-500 font-medium mt-5">
          {error}
        </p>
      )}

      <div className="flex justify-between items-center mt-10">
        <button
          type="button"
          onClick={() => setShowExitModal(true)}
          className="text-gray-600 hover:text-orange-500 font-medium"
        >
          ← Volver al inicio
        </button>

        {/* Corrección 1: Confirmado que usa onClick={handleNext} */}
        <button
          type="button"
          onClick={handleNext}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

export default PersonalForm;