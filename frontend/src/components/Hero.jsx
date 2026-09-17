function Hero() {
  return (
    <section
      className="
relative
min-h-[500px]
md:min-h-[600px]
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
      ></div>

      {/* Contenido */}

      <div
        className="
relative
z-10
text-white
px-6
md:px-20
max-w-xl
"
      >
        <h1
          className="
text-5xl
sm:text-6xl
md:text-7xl
font-bold
leading-tight
"
        >
          Tu moto
          <br />
          <span className="text-orange-500">siempre lista</span>
        </h1>

        <p
          className="
mt-6
text-lg
sm:text-xl
md:text-2xl
text-gray-200
"
        >
          Servicio rápido, confiable
          <br className="hidden sm:block" />y con técnicos expertos.
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
"
        >
          Agendar mi cita
        </a>
      </div>
    </section>
  );
}

export default Hero;
