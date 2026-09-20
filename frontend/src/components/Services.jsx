function Services() {
  const services = [
    {
      icon: "🔧",
      title: "Cambio de aceite",
      description: "Mantén el motor de tu moto en óptimas condiciones.",
    },
    {
      icon: "🛞",
      title: "Revisión de frenos",
      description: "Mayor seguridad para tus recorridos diarios.",
    },
    {
      icon: "💡",
      title: "Revisión de luces",
      description: "Verificamos el sistema eléctrico de tu moto.",
    },
    {
      icon: "🔋",
      title: "Revisión de batería",
      description: "Diagnóstico para evitar fallas inesperadas.",
    },
  ];

  return (
    <section
      id="servicios"
      className="
      bg-[#0B1115]
      py-20
      px-6
      md:px-20
      "
    >
      <h2
        className="
        text-4xl
        font-bold
        text-center
        text-white
        "
      >
        Nuestros servicios
      </h2>

      <p
        className="
        text-center
        text-gray-400
        mt-3
        max-w-xl
        mx-auto
        "
      >
        Mantenimiento profesional para que tu moto siempre esté lista para el
        camino.
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
        {services.map((service, index) => (
          <div
            key={index}
            className="
            bg-[#151C22]
            rounded-2xl
            p-8
            text-center
            border
            border-gray-800
            hover:border-orange-500
            hover:-translate-y-2
            transition-all
            duration-300
            "
          >
            <div
              className="
              w-16
              h-16
              mx-auto
              rounded-full
              bg-orange-500/10
              flex
              items-center
              justify-center
              text-4xl
              "
            >
              {service.icon}
            </div>

            <h3
              className="
              text-white
              font-bold
              text-xl
              mt-5
              "
            >
              {service.title}
            </h3>

            <p
              className="
              text-gray-400
              text-sm
              mt-3
              leading-relaxed
              "
            >
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div
        className="
        text-center
        mt-12
        "
      >
        <a
          href="/reservar"
          className="
          inline-block
          bg-orange-500
          hover:bg-orange-600
          text-white
          font-bold
          px-8
          py-3
          rounded-lg
          transition
          "
        >
        </a>
      </div>
    </section>
  );
}

export default Services;
