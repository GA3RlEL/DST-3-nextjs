"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  function handleSetTheme() {
    if (theme === "dark") setTheme("light");
    if (theme === "light") setTheme("dark");
    if (theme === "system") setTheme("light");
  }

  return (
    <h1 onClick={handleSetTheme} className="font-bold text-2xl cursor-pointer">
      K&K
    </h1>
  );
}
