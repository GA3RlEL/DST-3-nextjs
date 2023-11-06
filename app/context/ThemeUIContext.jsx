"use client";

const { createContext, useState, useContext, useEffect } = require("react");

const ThemeUIContext = createContext();

export default function ThemeUIProvider({ children }) {
  const [mode, setMode] = useState();

  function handleSetMode() {
    if (mode === "dark") {
      setMode("light");
      localStorage.setItem("mode", "light");
    }
    if (mode === "light") {
      setMode("dark");
      localStorage.setItem("mode", "dark");
    }
  }

  useEffect(() => {
    const modeFromLocalStorage = localStorage.getItem("mode");
    if (modeFromLocalStorage) {
      setMode(modeFromLocalStorage);
    } else {
      setMode("light");
      localStorage.setItem("mode", "light");
    }
  }, []);

  return (
    <ThemeUIContext.Provider value={{ mode, handleSetMode }}>
      {children}
    </ThemeUIContext.Provider>
  );
}

export function useThemeUI() {
  const context = useContext(ThemeUIContext);
  if (context === undefined) throw new Error("error context");
  return context;
}
