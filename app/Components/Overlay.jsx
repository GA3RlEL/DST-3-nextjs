import React from "react";
import { useTask } from "../context/TaskContext";

export default function Overlay() {
  const { isEditElement, resetContents } = useTask();

  return (
    <div
      onClick={resetContents}
      className={`transition-all fixed top-0 left-0 w-full z-20 h-full bg-slate-400/80  ${
        isEditElement ? "visible opacity-100" : "invisible opacity-5"
      }`}
    ></div>
  );
}
