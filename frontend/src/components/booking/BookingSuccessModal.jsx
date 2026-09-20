function BookingSuccessModal({
  isOpen,
  onClose
}) {

  if (!isOpen) return null;


  return (

    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
      px-4
      "
    >

      <div
        className="
        bg-white
        rounded-2xl
        shadow-xl
        p-8
        max-w-md
        w-full
        text-center
        "
      >

        <div
          className="
          text-5xl
          mb-5
          "
        >
          .........🏍........
        </div>


        <h2
          className="
          text-2xl
          font-bold
          text-[#0B1115]
          "
        >
          ¡Cita registrada!
        </h2>


        <p
          className="
          mt-4
          text-gray-600
          "
        >
          Nuestro equipo de MotoExpress se comunicará contigo
   
        </p>


        <button
          onClick={onClose}
          className="
          mt-6
          bg-orange-500
          hover:bg-orange-600
          text-white
          px-8
          py-3
          rounded-lg
          font-bold
          transition
          "
        >
          Volver al inicio
        </button>


      </div>

    </div>

  );

}


export default BookingSuccessModal;