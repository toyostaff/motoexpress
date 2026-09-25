import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

import logo from "../assets/images/logo_X.png";
import fondo from "../assets/images/admin-login-bg.jpg";

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const volverInicio = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!usuario || !password) {
      setError("Usuario y contraseña son obligatorios");
      return;
    }

    try {
      setCargando(true);

        //temporalmente

        console.log("ENVIANDO LOGIN", {
  usuario,
  password
});




      const response = await axios.post("/auth/login", {
        usuario,
        password,
      });

      if (response.data.ok) {
        localStorage.setItem("token", response.data.token);

        localStorage.setItem(
          "administrador",
          JSON.stringify(response.data.administrador)
        );

        navigate("/admin/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Error al iniciar sesión"
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-cover
        bg-center
        relative
      "
      style={{
        backgroundImage: `url(${fondo})`,
      }}
    >

      {/* BOTÓN ATRÁS */}
      <button
        onClick={volverInicio}
        className="
          absolute
          top-9
          left-9
          z-20
          bg-white/5
          hover:bg-white/5
          text-white
          px-5
          py-3
          rounded-lg
          backdrop-blur
          transition
          font-semibold
        "
      >
        ← ATRÁS
      </button>


      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/70"></div>


      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">

        <div
          className="
            bg-[#111820]
            rounded-2xl
            shadow-2xl
            p-8
            border
            border-white/10
          "
        >

          {/* Logo */}
          <div className="flex justify-center mb-6">

            <img
              src={logo}
              alt="MotoExpress"
              className="
                w-48
                object-contain
              "
            />

          </div>


          <h1
            className="
              text-white
              text-2xl
              font-bold
              text-center
              mb-2
            "
          >
            Panel Administrador
          </h1>


          <p
            className="
              text-gray-400
              text-center
              mb-8
            "
          >
            Ingresa tus credenciales para continuar
          </p>


          <form onSubmit={handleSubmit}>


            {/* Usuario */}
            <div className="mb-5">

              <label
                className="
                  text-gray-300
                  text-sm
                  block
                  mb-2
                "
              >
                Usuario
              </label>


              <input
                type="text"
                value={usuario}
                onChange={(e)=>
                  setUsuario(e.target.value)
                }
                className="
                  w-full
                  bg-[#0B1115]
                  border
                  border-gray-700
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-[#FF6A00]
                "
                placeholder="Ingrese usuario"
              />

            </div>



            {/* Password */}
            <div className="mb-5">

              <label
                className="
                  text-gray-300
                  text-sm
                  block
                  mb-2
                "
              >
                Contraseña
              </label>


              <div className="relative">

                <input
                  type={
                    mostrarPassword
                    ? "text"
                    : "password"
                  }
                  value={password}
                  onChange={(e)=>
                    setPassword(e.target.value)
                  }
                  className="
                    w-full
                    bg-[#0B1115]
                    border
                    border-gray-700
                    rounded-lg
                    px-4
                    py-3
                    pr-12
                    text-white
                    outline-none
                    focus:border-[#FF6A00]
                  "
                  placeholder="Ingrese contraseña"
                />


                <button
                  type="button"
                  onClick={() =>
                    setMostrarPassword(
                      !mostrarPassword
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-3
                    text-gray-400
                    hover:text-white
                  "
                >
                  {
                    mostrarPassword
                    ? "🙈"
                    : "👁"
                  }

                </button>

              </div>

            </div>



            {/* Error */}
            {error && (

              <div
                className="
                  bg-red-500/20
                  border
                  border-red-500/40
                  text-red-300
                  text-sm
                  rounded-lg
                  p-3
                  mb-5
                "
              >
                {error}
              </div>

            )}



            {/* Botón */}
            <button
              type="submit"
              disabled={cargando}
              className="
                w-full
                bg-[#FF6A00]
                hover:bg-orange-600
                text-white
                font-semibold
                py-3
                rounded-lg
                transition
                disabled:opacity-50
              "
            >

              {
                cargando
                ? "Ingresando..."
                : "Iniciar sesión"
              }

            </button>


          </form>


        </div>

      </div>


    </div>
  );
}

export default Login;