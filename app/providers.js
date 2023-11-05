"use client";

import React, { useEffect, useState } from "react";
import AuthContextProvider from "./context/AuthContext";
import TagsContextProvider from "./context/TagsContext";
import CreateContextProvider from "./context/CreateContext";
import { TaskContentProvider } from "./context/TaskContext";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

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
            <ThemeProvider
              enableSystem={false}
              attribute="class"
              themes={["light", "dark"]}
            >
              {children}
            </ThemeProvider>
          </TaskContentProvider>
        </CreateContextProvider>
      </TagsContextProvider>
    </AuthContextProvider>
  );
}
