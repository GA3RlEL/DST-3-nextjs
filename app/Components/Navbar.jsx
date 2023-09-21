import React from "react";

export default function Navbar({ isVisibleHeader }) {
  return (
    <nav
      className={` sticky top-0 mb-1 py-4 ${
        !isVisibleHeader && "bg-black/5 backdrop-blur-sm"
      }`}
    >
      <div className="flex justify-between max-w-3xl mx-auto px-4">
        <span>Tasks</span>
        <span>Add</span>
      </div>
    </nav>
  );
}
