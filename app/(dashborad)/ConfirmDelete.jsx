"use client";

import React from "react";
import { useTask } from "../context/TaskContext";

export default function ConfirmDelete() {
  const { isDelete, deleteName, handleDelete, deleteLoading, cancelDelete } =
    useTask();

  return (
    <div
      className={`z-50 transition-all ${isDelete && "transalte-y-0"} ${
        !isDelete && "translate-y-20"
      } fixed bottom-0 w-full bg-red-500 py-4 px-2 flex justify-between text-white`}
    >
      <span>Do you really want to delete - {deleteName}?</span>
      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          className="transition-all disabled:text-gray-500 hover:text-black"
          disabled={deleteLoading}
        >
          Delete
        </button>
        <button
          disabled={deleteLoading}
          onClick={cancelDelete}
          className="transition-all hover:text-black disabled:text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
