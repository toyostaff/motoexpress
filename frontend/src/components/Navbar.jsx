import logoX from "../assets/images/logo_X.png";

function Navbar() {
  return (
    <nav className="bg-[#0B1115] text-white px-6 md:px-10 py-4 flex justify-between items-center">
      {/* Cambio 2: gap-4 para separar más el logo del texto */}
      <div className="flex items-center gap-4">
        {/* Cambio 1: w-16 h-16 para mayor visibilidad del logo */}
        <img
          src={logoX}
          alt="MotoExpress"
          className="w-16 h-16 object-contain"
        />

        <div className="text-xl md:text-2xl font-bold">
          Moto
          <span className="text-orange-500">Express</span>
          <p className="text-[10px] text-gray-400 tracking-widest">
            LIMA NORTE
          </p>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8 text-sm">
        <a href="/">Inicio</a>

        <a href="/reservar">Agendar cita</a>

        {/* Cambio 3: Hover ajustado a azul (hover:bg-blue-600 hover:border-blue-600) */}
        <a
          href="/admin"
          className="border border-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:border-blue-600 transition"
        >
          🔒 Administrador
        </a>
      </div>

      {/* Mobile */}
      <button className="md:hidden text-2xl">☰</button>
    </nav>
  );
}

export default Navbar;
