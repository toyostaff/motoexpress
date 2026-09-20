import beneficio1 from "../assets/images/beneficio1.jpg";
import beneficio2 from "../assets/images/beneficio2.jpg";
import beneficio3 from "../assets/images/beneficio3.jpg";
import beneficio4 from "../assets/images/beneficio4.jpg";

const benefits = [
  {
    title: "Servicio a domicilio",
    description:
      "Llegamos hasta tu ubicación para que no pierdas tiempo trasladando tu moto.",
    image: beneficio1,
  },
  {
    title: "Atención en Lima Norte",
    description:
      "Servicio pensado para estudiantes, trabajadores y hogares de la zona.",
    image: beneficio2,
  },
  {
    title: "Atención rápida",
    description: "Coordinamos horarios para que continúes con tus actividades.",
    image: beneficio3,
  },
  {
    title: "Técnicos especializados",
    description:
      "Personal preparado para diferentes marcas y modelos de motocicletas.",
    image: beneficio4,
  },
];

function Benefits() {
  return (
    <section
      className="
      bg-[#0B1115]
      text-white
      py-20
      px-6
      md:px-20
      "
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="
          text-4xl
          md:text-5xl
          font-bold
          text-center
          "
        >
          Más que un taller,
          <br />
          <span className="text-orange-500">tu aliado en el camino</span>
        </h2>

        <p
          className="
          text-center
          text-gray-300
          mt-5
          max-w-2xl
          mx-auto
          "
        >
          Conoce por qué nuestros clientes confían en MotoExpress para el
          cuidado de su motocicleta.
        </p>

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
          mt-12
          "
        >
          {benefits.map((item, index) => (
            <div
              key={index}
              className="
              bg-[#111820]
              rounded-xl
              overflow-hidden
              border
              border-gray-800
              hover:border-orange-500
              transition
              flex
              flex-col
              h-[370px]
              "
            >
              <div
                className="
                h-[210px]
                p-6
                text-center
                "
              >
                <h3
                  className="
                  text-xl
                  font-bold
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                  mt-5
                  text-gray-300
                  text-sm
                  leading-relaxed
                  "
                >
                  {item.description}
                </p>
              </div>

              <img
                src={item.image}
                alt={item.title}
                className="
                w-full
                h-[160px]
                object-cover
                object-center
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;
