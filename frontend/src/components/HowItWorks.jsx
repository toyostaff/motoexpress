function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: "📅",
      title: "Solicita tu cita",
      description:
        "Selecciona el servicio, fecha y horario que más se adapte a tu disponibilidad.",
    },
    {
      number: "02",
      icon: "📍",
      title: "Llegamos hasta ti",
      description:
        "Nos desplazamos por Lima Norte hasta tu hogar, trabajo o universidad.",
    },
    {
      number: "03",
      icon: "🔧",
      title: "Realizamos el servicio",
      description:
        "Nuestros técnicos revisan tu moto y realizan el mantenimiento necesario.",
    },
    {
      number: "04",
      icon: "🏍️",
      title: "Tu moto queda lista",
      description:
        "Continúa tu camino con una moto segura y en buenas condiciones.",
    },
  ];

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
      <div
        className="
        max-w-6xl
        mx-auto
        "
      >

        <div className="text-center">

          <h2
            className="
            text-4xl
            md:text-5xl
            font-bold
            "
          >
            ¿Cómo funciona
            <span className="text-orange-500">
              {" "}MotoExpress?
            </span>
          </h2>

          <p
            className="
            mt-4
            text-gray-300
            max-w-2xl
            mx-auto
            "
          >
            Tu moto necesita atención, nosotros llegamos hasta donde estés.
            Servicio técnico a domicilio en Lima Norte.
          </p>

        </div>


        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
          mt-12
          "
        >

          {steps.map((step) => (

            <div
              key={step.number}
              className="
              relative
              bg-[#151C22]
              border
              border-[#26313A]
              rounded-2xl
              p-6
              text-center
              hover:border-orange-500
              transition
              "
            >

              <div
                className="
                absolute
                top-4
                left-5
                text-orange-500
                font-bold
                text-lg
                "
              >
                {step.number}
              </div>


              <div
                className="
                text-5xl
                mt-6
                "
              >
                {step.icon}
              </div>


              <h3
                className="
                mt-5
                text-xl
                font-bold
                "
              >
                {step.title}
              </h3>


              <p
                className="
                mt-3
                text-gray-300
                text-sm
                leading-relaxed
                "
              >
                {step.description}
              </p>


            </div>

          ))}

        </div>


      </div>
    </section>
  );
}

export default HowItWorks;