import logoX from "../assets/images/logo_X.png";

function Footer() {
  return (
    <footer
      className="
      bg-[#0B1115]
      text-gray-300
      py-10
      px-6
      md:px-20
      "
    >

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-[1.5fr_1fr_1fr_1fr]
        gap-8
        items-center
        "
      >

{/* Logo */}
<div>

  <div
    className="
    flex
    flex-col
    items-start
    "
  >

    <img
      src={logoX}
      alt="MotoExpress"
      className="
      w-28
      h-28
      object-contain
      "
    />


    <h3
      className="
      text-3xl
      font-bold
      text-white
      mt-2
      "
    >
      Moto
      <span className="text-orange-500">
        Express
      </span>
    </h3>


    <p
      className="
      text-xs
      text-gray-400
      tracking-widest
      "
    >
      LIMA NORTE
    </p>


  </div>

</div>



        {/* Contacto */}
        <div>

          <h4
            className="
            text-white
            font-bold
            text-lg
            "
          >
            Contacto
          </h4>


          <p className="mt-3">
            📞 123456789 - XAVIER
          </p>


          <p>
            📍 Lima Norte
          </p>


        </div>



        {/* Horario */}
        <div>

          <h4
            className="
            text-white
            font-bold
            text-lg
            "
          >
            Horario
          </h4>


          <p className="mt-3">
            Lunes - Sábado
          </p>


          <p>
            08:00 - 20:00
          </p>


        </div>



        {/* Redes */}
        <div>

          <h4
            className="
            text-white
            font-bold
            text-lg
            "
          >
            Síguenos
          </h4>


          <div
            className="
            flex
            gap-4
            mt-4
            "
          >

            <a
              href="#"
              className="
              hover:text-orange-500
              transition
              "
            >
              Instagram
            </a>


            <a
              href="#"
              className="
              hover:text-orange-500
              transition
              "
            >
              TikTok
            </a>


          </div>


        </div>


      </div>



      <div
        className="
        border-t
        border-gray-700
        mt-8
        pt-6
        text-center
        text-sm
        "
      >

        Todos los derechos reservados - 2026

      </div>


    </footer>
  );
}

export default Footer;