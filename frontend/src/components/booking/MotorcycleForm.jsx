import { useState } from "react";

import ExitBookingModal from "./ExitBookingModal";

function MotorcycleForm({ formData, setFormData, nextStep, previousStep }) {
  const [showExitModal, setShowExitModal] = useState(false);

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "marca_moto" && value !== "OTROS") {
      setFormData({
        ...formData,

        marca_moto: value,

        detalle_marca: "",
      });

      setError("");

      return;
    }

    if (name === "detalle_marca") {
      newValue = value.toUpperCase();
    }

    if (name === "placa") {
      newValue = value

        .toUpperCase()

        .replace(/[^A-Z0-9]/g, "")

        .slice(0, 7);

      if (newValue.length === 7) {
        newValue = newValue.substring(0, 3) + "-" + newValue.substring(3);
      }
    }

    setError("");

    setFormData({
      ...formData,

      [name]: newValue,
    });
  }

  function handleNext() {
    if (!formData.marca_moto) {
      setError("Selecciona la marca de tu moto");

      return;
    }

    if (formData.marca_moto === "OTROS" && !formData.detalle_marca.trim()) {
      setError("Especifica la marca de tu moto");

      return;
    }

    if (!formData.placa.trim()) {
      setError("Ingresa la placa de tu moto");

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

      <h2
        className="
        text-2xl
        font-bold
        text-[#0B1115]
        "
      >
        Datos de tu moto
      </h2>

      <p
        className="
        text-gray-500
        mt-2
        "
      >
        Cuéntanos un poco sobre tu moto
      </p>

      <div
        className="
        mt-8
        space-y-5
        "
      >
        <div>
          <label
            className="
            block
            font-semibold
            mb-2
            "
          >
            Marca *
          </label>

          <select
            name="marca_moto"
            value={formData.marca_moto}
            onChange={handleChange}
            className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            focus:outline-none
            focus:ring-2
            focus:ring-orange-500
            "
          >
            <option value="">Selecciona una marca</option>

            <option value="HONDA">HONDA</option>

            <option value="YAMAHA">YAMAHA</option>

            <option value="BAJAJ">BAJAJ</option>

            <option value="SUZUKI">SUZUKI</option>

            <option value="OTROS">OTROS</option>
          </select>
        </div>

        {formData.marca_moto === "OTROS" && (
          <div>
            <label
              className="
                block
                font-semibold
                mb-2
                "
            >
              Detalle de marca *
            </label>

            <input
              name="detalle_marca"
              value={formData.detalle_marca}
              onChange={handleChange}
              placeholder="Especifique la marca"
              className="
                w-full
                border
                rounded-lg
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-orange-500
                "
            />
          </div>
        )}

        <div>
          <label
            className="
            block
            font-semibold
            mb-2
            "
          >
            Placa *
          </label>

          <input
            type="text"
            name="placa"
            value={formData.placa}
            onChange={handleChange}
            placeholder="Ej. ABC-1234"
            maxLength="8"
            autoCapitalize="characters"
            className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            uppercase
            focus:outline-none
            focus:ring-2
            focus:ring-orange-500
            "
          />
        </div>
      </div>

      {error && (
        <p
          className="
            text-red-500
            font-medium
            mt-5
            "
        >
          {error}
        </p>
      )}

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
    </div>
  );
}

export default MotorcycleForm;
