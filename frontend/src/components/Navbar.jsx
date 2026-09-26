import { useState } from "react";

import logoX from "../assets/images/logo_X.png";

function Navbar() {

  const [open, setOpen] = useState(false);


  return (
    <nav className="relative bg-[#0B1115] text-white px-6 md:px-10 py-4 flex justify-between items-center">

      {/* Logo */}
      <div className="flex items-center gap-4">

        <img
          src={logoX}
          alt="MotoExpress"
          className="w-16 h-16 object-contain"
        />


        <div className="text-xl md:text-2xl font-bold">

          Moto
          <span className="text-orange-500">
            Express
          </span>

          <p className="text-[10px] text-gray-400 tracking-widest">
            LIMA NORTE
          </p>

        </div>

      </div>



      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8 text-sm">

        <a href="/">
          Inicio
        </a>


        <a href="/reservar">
          Agendar cita
        </a>


        <a
          href="/admin"
          className="
          border 
          border-blue-500 
          text-white 
          px-4 
          py-2 
          rounded-lg 
          hover:bg-blue-600 
          hover:border-blue-600 
          transition
          "
        >
          🔒 Administrador
        </a>

      </div>




      {/* Botón móvil */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-3xl"
      >
        ☰
      </button>





      {/* Menú móvil */}
      {open && (

        <div
          className="
          absolute
          top-full
          left-0
          w-full
          bg-[#0B1115]
          text-white
          flex
          flex-col
          gap-5
          p-6
          md:hidden
          shadow-lg
          z-50
          "
        >

          <a
            href="/"
            onClick={() => setOpen(false)}
          >
            Inicio
          </a>


          <a
            href="/reservar"
            onClick={() => setOpen(false)}
          >
            Agendar cita
          </a>



          <a
            href="/admin"
            onClick={() => setOpen(false)}
            className="
            border
            border-blue-500
            px-4
            py-2
            rounded-lg
            text-center
            "
          >
            🔒 Administrador
          </a>


        </div>

      )}


    </nav>
  );
}


export default Navbar;
