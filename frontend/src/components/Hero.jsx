function Hero() {
  return (
    <section
      className="
      relative
      min-h-[420px]
      md:min-h-[650px]
      flex
      items-center
      overflow-hidden
      bg-cover
      bg-no-repeat
      bg-[position:85%_center]
      md:bg-center
      "
      style={{
        backgroundImage: "url('/moto-hero.jpg')",
      }}
    >

      {/* Capa oscura */}
      <div
        className="
        absolute
        inset-0
        bg-black/60
        "
      />

      {/* Contenido */}
      <div
        className="
        relative
        z-10
        text-white
        px-6
        md:px-24
        lg:px-32
        max-w-2xl
        py-10
        md:py-0
        "
      >

        <h1
          className="
          text-4xl
          sm:text-5xl
          md:text-6xl
          font-bold
          leading-tight
          "
        >
          Nosotros vamos
          <br />
          
          <span className="text-orange-500">
            hasta ti.
          </span>
        </h1>

        <p
          className="
          mt-6
          text-lg
          sm:text-xl
          md:text-2xl
          text-gray-200
        max-w-md
          "
        >
          Servicio técnico a domicilio para motos.
          <br />
          Mantenimiento y reparación sin salir de casa.
        </p>

        <a
          href="/reservar"
          className="
          inline-block
          mt-8
          bg-orange-500
          hover:bg-orange-600
          px-8
          py-3
          md:px-10
          md:py-4
          rounded-lg
          font-bold
          text-base
          md:text-lg
          transition
          "
        >
          Agendar mi cita
        </a>

      </div>

    </section>
  );
}

export default Hero;