import Sidebar from "../components/admin/Sidebar";
import NavbarAdmin from "../components/admin/NavbarAdmin";
import { useTheme } from "../context/ThemeContext";

function AdminLayout({ children }) {
  const { darkMode } = useTheme();

  return (
    <div
      className={`

                min-h-screen

                flex


                ${
                  darkMode
                    ? "bg-slate-950 text-white"
                    : "bg-slate-100 text-gray-800"
                }


            `}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <NavbarAdmin />

        <main
          className={`

                        p-6

                        flex-1


                        ${darkMode ? "bg-slate-950" : "bg-slate-100"}


                    `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
