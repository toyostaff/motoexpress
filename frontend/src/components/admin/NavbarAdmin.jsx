function NavbarAdmin() {

    const fecha = new Date().toLocaleDateString(
        "es-PE",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );


    return (

        <header
            className="
        h-20
        bg-white
        border-b
        border-gray-200
        flex
        items-center
        justify-between
        px-6
        shadow-sm
      "
        >


            {/* Título */}

            <div>

                <h1
                    className="
            text-2xl
            font-bold
            text-gray-800
          "
                >
                    Dashboard
                </h1>


                <p
                    className="
            text-sm
            text-gray-500
          "
                >
                    {fecha}
                </p>

            </div>



            {/* Usuario */}

            <div
                className="
          flex
          items-center
          gap-5
        "
            >


                {/* Notificación */}

                <button
                    className="
            relative
            text-gray-500
            hover:text-[#FF6A00]
            text-xl
          "
                >

                    🔔

                    <span
                        className="
              absolute
              -top-2
              -right-2
              bg-[#FF6A00]
              text-white
              text-xs
              w-5
              h-5
              rounded-full
              flex
              items-center
              justify-center
            "
                    >
                        3
                    </span>


                </button>



                {/* Perfil */}

                <div
                    className="
            flex
            items-center
            gap-3
          "
                >

                    <div
                        className="
              w-10
              h-10
              rounded-full
              bg-[#FF6A00]
              text-white
              flex
              items-center
              justify-center
              font-bold
            "
                    >
                        A
                    </div>


                    <div>

                        <p
                            className="
                font-semibold
                text-gray-800
              "
                        >
                            Administrador
                        </p>


                        <p
                            className="
                text-xs
                text-gray-500
              "
                        >
                            MotoExpress
                        </p>

                    </div>


                </div>


            </div>


        </header>

    );

}


export default NavbarAdmin;