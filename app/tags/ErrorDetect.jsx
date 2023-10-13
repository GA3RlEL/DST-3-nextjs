"use client";

import React from "react";
import { useTagsContext } from "../context/TagsContext";

export default function ErrorDetect() {
  const { isExist, error, clearError } = useTagsContext();

  // if (!error) return;

  return (
    <div
      className={`transition-all ${isExist && "transalte-y-0"} ${
        !isExist && "translate-y-20"
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
