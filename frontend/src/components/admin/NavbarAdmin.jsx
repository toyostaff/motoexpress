import { useTheme } from "../../context/ThemeContext";

function NavbarAdmin() {
  const { darkMode, cambiarTema } = useTheme();

  const fecha = new Date().toLocaleDateString("es-PE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header
      className={`
h-20
flex
items-center
justify-between
px-6
shadow-sm
border-b

${
  darkMode
    ? "bg-slate-900 border-slate-700 text-white"
    : "bg-white border-gray-200 text-gray-800"
}

`}
    >
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <p
          className={`
text-sm
${darkMode ? "text-gray-400" : "text-gray-500"}
`}
        >
          {fecha}
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button onClick={cambiarTema} className="text-xl">
          {darkMode ? "🔦" : "🌙"}
        </button>

        <button className="relative text-xl">
          
          
        </button>

        <div className="flex items-center gap-3">
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
            <p className="font-semibold">Administrador</p>

            <p
              className={`
text-xs
${darkMode ? "text-gray-400" : "text-gray-500"}
`}
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
