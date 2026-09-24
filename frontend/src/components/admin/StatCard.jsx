import { useTheme } from "../../context/ThemeContext";

function StatCard({ title, value, icon, color }) {
  const { darkMode } = useTheme();

  return (
    <div
      className={`border rounded-xl p-5 flex justify-between items-center transition-colors ${
        darkMode
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      <div>
        <p
          className={`text-sm ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {title}
        </p>

        <h3
          className={`text-3xl font-bold mt-1 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {value}
        </h3>
      </div>

      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
          darkMode ? "bg-slate-800" : color || "bg-gray-100"
        }`}
      >
        {icon}
      </div>
    </div>
  );
}

export default StatCard;