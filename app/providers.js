"use client";

import React, { useEffect, useState } from "react";
import AuthContextProvider from "./context/AuthContext";
import TagsContextProvider from "./context/TagsContext";
import CreateContextProvider from "./context/CreateContext";
import { TaskContentProvider } from "./context/TaskContext";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { DarkMode } from "@mui/icons-material";
import { useThemeUI } from "./context/ThemeUIContext";

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  const { mode } = useThemeUI();

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <AuthContextProvider>
        <TagsContextProvider>
          <CreateContextProvider>
            <TaskContentProvider>{children}</TaskContentProvider>
          </CreateContextProvider>
        </TagsContextProvider>
      </AuthContextProvider>
    );
  }

  return (
    <AuthContextProvider>
      <TagsContextProvider>
        <CreateContextProvider>
          <TaskContentProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </TaskContentProvider>
        </CreateContextProvider>
      </TagsContextProvider>
    </AuthContextProvider>
  );
}
