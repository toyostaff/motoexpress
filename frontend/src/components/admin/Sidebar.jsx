import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo_X.png";
import { useTheme } from "../../context/ThemeContext";

function Sidebar() {
  const { darkMode, cambiarTema } = useTheme();

  const cerrarSesion = () => {
    localStorage.clear();
    window.location.href = "/admin/login";
  };

  const sections = [
    {
      title: "PRINCIPAL",

      items: [
        {
          name: "Dashboard",
          icon: "🏠",
          path: "/admin/dashboard",
        },

        {
          name: "Citas",
          icon: "📅",
          path: "/admin/citas",
        },

        {
          name: "Calendario",
          icon: "🗓️",
          path: "/admin/calendario",
        },
      ],
    },

    {
      title: "SEMANAL",

      items: [
        {
          name: "Agenda semanal",
          icon: "📆",
          path: "/admin/semanal",
        },
      ],
    },
  ];
  return (
    <aside
      className="
        w-64
        min-h-screen
        bg-[#111820]
        text-white
        flex
        flex-col
        shadow-xl
      "
    >
      {/* LOGO */}

      <div
        className="
          h-36
          bg-[#FF6A00]
          flex
          flex-col
          items-center
          justify-center
          border-b
          border-white/10
        "
      >
        <img
          src={logo}
          alt="MotoExpress"
          className="
            w-28
            h-20
            object-contain
            mb-2
          "
        />

        <h2
          className="
            text-white
            font-bold
            text-lg
          "
        >
          MotoExpress
        </h2>

        <span
          className="
            text-xs
            text-white/80
            uppercase
          "
        >
          Panel Administrador
        </span>
      </div>

      {/* MENU */}

      <nav
        className="
          flex-1
          px-3
          py-5
        "
      >
        {sections.map((section, index) => (
          <div key={index} className="mb-6">
            <p
              className="
                text-[11px]
                text-gray-400
                font-semibold
                tracking-wider
                px-3
                mb-3
              "
            >
              {section.title}
            </p>

            {section.items.map((item, itemIndex) => (
              <NavLink
                key={itemIndex}
                to={item.path}
                className={({ isActive }) =>
                  `
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    mb-1
                    rounded-lg
                    transition
                    text-sm

                    ${
                      isActive
                        ? "bg-[#FF6A00] text-white shadow-lg"
                        : "text-gray-300 hover:bg-white/10"
                    }

                    `
                }
              >
                <span className="text-lg">{item.icon}</span>

                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* TEMA */}

      <div
        className="
          px-4
          pb-3
        "
      >
        <button
          onClick={cambiarTema}
          className="
w-full
flex
items-center
gap-3
px-4
py-3
rounded-lg
text-gray-300
hover:bg-white/10
transition
text-sm
"
        >
          <span>{darkMode ? "☀️" : "🌙"}</span>

          {darkMode ? "Tema claro" : "Tema oscuro"}
        </button>
      </div>

      {/* CERRAR SESIÓN */}

      <div
        className="
          p-4
          border-t
          border-white/10
        "
      >
        <button
          onClick={cerrarSesion}
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-lg
            text-gray-300
            hover:bg-red-600
            hover:text-white
            transition
            text-sm
          "
        >
          <span>🚪</span>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
