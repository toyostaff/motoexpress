function Navbar() {
  return (
    <nav
      className="
bg-[#0B1115]
text-white
px-6
md:px-10
py-5
flex
justify-between
items-center
"
    >
      <div
        className="
text-xl
md:text-2xl
font-bold
"
      >
        Moto<span className="text-orange-500">Express</span>
      </div>

      {/* Desktop */}

      <div
        className="
hidden
md:flex
gap-8
text-sm
"
      >
        <a href="/">Inicio</a>

        <a href="#servicios">Servicios</a>

        <a href="/reservar">Agendar cita</a>

        <a href="#">Contacto</a>
      </div>

      {/* Mobile */}

      <button
        className="
md:hidden
text-2xl
"
      >
        ☰
      </button>
    </nav>
  );
}

export default Navbar;
