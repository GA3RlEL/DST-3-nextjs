"use client";

import { useUserContext } from "@/app/context/AuthContext";
import React from "react";

export default function ErrorDetect() {
  const { isError, clearError, error } = useUserContext();

  return (
    <div
      className={`transition-all ${isError && "transalte-y-0"} ${
        !isError && "translate-y-20"
      } fixed bottom-0 w-full bg-red-500 py-4 px-2 flex justify-between text-white`}
    >
      <span>{error}</span>
      <button
        onClick={clearError}
        className="transition-all hover:text-black disabled:text-gray-500"
      >
        Close
      </button>
    </div>
  );
}
