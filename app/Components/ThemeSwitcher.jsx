"use client";

import { useThemeUI } from "../context/ThemeUIContext";

export default function ThemeSwitcher() {
  const { handleSetMode } = useThemeUI();
  return (
    <h1 onClick={handleSetMode} className="font-bold text-2xl cursor-pointer">
      K&K
    </h1>
  );
}
