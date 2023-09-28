"use client";

import React from "react";
import { useCreateContext } from "../context/CreateContext";
import Link from "next/link";
import { useTagsContext } from "../context/TagsContext";

export default function AddNotification({ children }) {
  const { success, handleCloseSuccess, timer } = useTagsContext();

  return (
    <div
      className={`transition-all ${success && "transalte-y-0"} ${
        !success && "translate-y-20"
      } fixed bottom-0 w-full bg-green-500 py-4 px-2 flex justify-between text-white`}
    >
      <span>
        Your {children} has been added ({timer})
      </span>
      <div className="flex gap-4">
        <Link onClick={() => handleCloseSuccess()} href="/">
          Home
        </Link>
        <button onClick={() => handleCloseSuccess()}>Close</button>
      </div>
    </div>
  );
}
