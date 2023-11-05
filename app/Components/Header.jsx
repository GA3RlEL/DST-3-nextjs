"use client";

import Link from "next/link";
import React from "react";
import { useUserContext } from "../context/AuthContext";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header({ children }) {
  const { logOut, user } = useUserContext();

  return (
    <header className="mb-1 py-4">
      <div className="flex justify-between items-center max-w-3xl mx-auto px-4">
        <ThemeSwitcher />
        {children}
        {!user && (
          <Link href="/login">
            <button className="bg-btn-primary px-4 py-2 text-white min-w-[93.91px]">
              Login
            </button>
          </Link>
        )}
        {user && (
          <button
            onClick={logOut}
            className="bg-btn-primary px-4 py-2 text-white min-w-[93.91px]"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
