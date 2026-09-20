import { useNavigate } from "react-router-dom";

function ExitBookingModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const handleExit = () => {
    navigate("/");
  };

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/60
      px-4
      "
    >
      <div
        className="
        bg-white
        w-full
        max-w-md
        rounded-2xl
        shadow-2xl
        p-8
        "
      >
        <h2
          className="
          text-2xl
          font-bold
          text-[#0B1115]
          mb-4
          "
        >
          ¿Deseas salir de la reserva?
        </h2>

        <p
          className="
          text-gray-600
          mb-8
          "
        >
          Los datos ingresados se perderán y tendrás que iniciar nuevamente el
          proceso de reserva.
        </p>

        <div
          className="
          flex
          justify-end
          gap-4
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
            px-5
            py-3
            rounded-lg
            border
            border-gray-300
            text-gray-700
            hover:bg-gray-100
            font-medium
            "
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleExit}
            className="
            px-5
            py-3
            rounded-lg
            bg-orange-500
            hover:bg-orange-600
            text-white
            font-bold
            "
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExitBookingModal;
