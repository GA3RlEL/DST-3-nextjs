import React from "react";
import { useTask } from "../context/TaskContext";

export default function AddNotification() {
  const { success, handleCloseSuccess } = useTask();

  return (
    <div
      className={`transition-all ${success && "transalte-y-0"} ${
        !success && "translate-y-20"
      } fixed bottom-0 w-full bg-green-500 py-4 px-2 flex justify-between text-white z-50`}
    >
      <span>Task has been updated</span>
      <div className="flex gap-4">
        <button onClick={() => handleCloseSuccess()}>Close</button>
      </div>
    </div>
  );
}
