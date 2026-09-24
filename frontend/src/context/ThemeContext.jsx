import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();


export function ThemeProvider({ children }) {

  const [darkMode, setDarkMode] = useState(() => {

    const guardado = localStorage.getItem("admin-theme");

    return guardado === "dark";

  });


  const cambiarTema = () => {

    setDarkMode((prev) => {

      const nuevo = !prev;

      localStorage.setItem(
        "admin-theme",
        nuevo ? "dark" : "light"
      );

      return nuevo;

    });

  };


  return (

    <ThemeContext.Provider
      value={{
        darkMode,
        cambiarTema
      }}
    >

      {children}

    </ThemeContext.Provider>

  );

}


export function useTheme(){

  return useContext(ThemeContext);

}