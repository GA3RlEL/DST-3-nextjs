"use client";

import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Navbar({ isVisibleHeader }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <nav
      className={` sticky top-0 mb-1 py-4 ${
        !isVisibleHeader && "bg-black/5 backdrop-blur-sm"
      }`}
    >
      <div className="flex justify-between items-center max-w-3xl mx-auto px-4 ">
        <span>Tasks</span>
        <div className="relative transition-all">
          <button
            onClick={() => setIsClicked((click) => !click)}
            className="flex px-4 py-2 bg-btn-primary text-white uppercase"
          >
            Add
            <div className={`${isClicked && "rotate-180"} transition-all`}>
              <KeyboardArrowDownIcon />
            </div>
          </button>

          <ul
            className={`transition-all absolute  top-full left-1/2 -translate-x-1/2 bg-blue-400 w-full flex justify-center flex-col items-center gap-1 ${
              isClicked && "opacity-100"
            } ${!isClicked && "opacity-0"}`}
          >
            <li>
              <a href="#">dupa</a>
            </li>
            <li>kupa</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
