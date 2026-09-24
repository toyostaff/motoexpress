import { createContext, useContext, useEffect, useState } from "react";

const AdminThemeContext = createContext();

export function AdminThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const guardado = localStorage.getItem("adminTheme");

    return guardado === "dark";
  });

  useEffect(() => {
    localStorage.setItem("adminTheme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const cambiarTema = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <AdminThemeContext.Provider
      value={{
        darkMode,
        cambiarTema,
      }}
    >
      {children}
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  return useContext(AdminThemeContext);
}
