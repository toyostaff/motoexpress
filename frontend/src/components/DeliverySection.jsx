import { useState } from "react";

function DeliverySection() {
  const [sound, setSound] = useState(false);

  return (
    <section
      className="
      bg-[#0B1115]
      text-white
      py-16
      px-6
      md:px-20
      "
    >
      <div
        className="
        max-w-6xl
        mx-auto
       grid
md:grid-cols-2
gap-14
items-center
        "
      >
        <div>
          <h2
            className="
            text-4xl
            md:text-5xl
            font-bold
            leading-tight
            "
          >
            Mantén tu moto
            <br />
            <span className="text-orange-500">sin detener tu día</span>
          </h2>

          <p
            className="
            mt-5
            text-gray-300
            text-lg
            "
          >
            Realizamos mantenimiento y revisiones en tu ubicación para que
            continúes con tus actividades.
          </p>

          <div
            className="
            mt-8
            grid
            grid-cols-2
            gap-4
            "
          >
            <div
              className="
              bg-[#151C22]
              rounded-xl
              p-4
              "
            >
              🚚
              <p className="font-bold mt-2">A domicilio</p>
              <span
                className="
                text-sm
                text-gray-400
                "
              >
                Llegamos donde estés
              </span>
            </div>

            <div
              className="
              bg-[#151C22]
              rounded-xl
              p-4
              "
            >
              🎓
              <p className="font-bold mt-2">Para tu rutina</p>
              <span
                className="
                text-sm
                text-gray-400
                "
              >
                Hogar, trabajo o universidad
              </span>
            </div>

            <div
              className="
              bg-[#151C22]
              rounded-xl
              p-4
              "
            >
              ⚡<p className="font-bold mt-2">Ahorra tiempo</p>
              <span
                className="
                text-sm
                text-gray-400
                "
              >
                Sin traslados innecesarios
              </span>
            </div>

            <div
              className="
              bg-[#151C22]
              rounded-xl
              p-4
              "
            >
              🔧
              <p className="font-bold mt-2">Servicio profesional</p>
              <span
                className="
                text-sm
                text-gray-400
                "
              >
                Técnicos preparados
              </span>
            </div>
          </div>
        </div>

        {/* Video */}
        <div
          className="
  relative
  rounded-2xl
  overflow-hidden
  bg-black
  shadow-xl
  "
        >
          <video
            src="/videos/motoexpress-servicio.mp4"
            autoPlay
            muted={!sound}
            loop
            playsInline
            className="
w-full
h-[450px]
md:h-[520px]
object-cover
"
          />

          <button
            onClick={() => setSound(!sound)}
            className="
            absolute
            bottom-5
            right-5
            bg-orange-500
            text-white
            w-12
            h-12
            rounded-full
            flex
            items-center
            justify-center
            text-xl
            hover:bg-orange-600
            transition
            "
          >
            {sound ? "🔊" : "🔇"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default DeliverySection;
