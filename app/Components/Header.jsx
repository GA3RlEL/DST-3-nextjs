import Link from "next/link";
import React from "react";

export default function Header({ children }) {
  return (
    <header className="mb-1 py-4">
      <div className="flex justify-between items-center max-w-3xl mx-auto px-4">
        <h1 className="font-bold text-2xl">K&K</h1>
        {children}
        <Link href="/login">
          <button className="bg-btn-primary px-4 py-2 text-white min-w-[93.91px]">
            Login
          </button>
        </Link>
      </div>
    </header>
  );
}
