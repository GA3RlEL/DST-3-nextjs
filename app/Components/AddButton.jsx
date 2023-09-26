"use client";

import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import TagIcon from "@mui/icons-material/Tag";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import TaskIcon from "@mui/icons-material/Task";
import Link from "next/link";

export default function AddButton() {
  const [visible, setVisible] = useState(true);
  const [clicked, setClicked] = useState(false);

  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      prevScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <button
        onClick={() => setClicked((click) => !click)}
        className={`transition-all w-16 h-16 rounded-full bg-btn-primary fixed bottom-3  right-3 md:right-1/4 z-50 ${
          visible ? "opacity-100  scale-100" : "opacity-0  -scale-50"
        }`}
      >
        <AddIcon
          className={`text-white ${
            clicked && "rotate-[135deg]"
          } transition-all`}
        />
      </button>
      <ul
        className={`transition-all fixed bottom-24 right-7 z-50 text-white flex flex-col items-center md:right-[27%] lg:right-[25.8%] gap-3 ${
          clicked
            ? "visible opacity-100 scale-100"
            : "invisible opacity-0 -scale-50"
        }`}
      >
        <li className="flex items-center justify-center gap-4 min-w-[92px] ">
          Edit
          <div className="bg-btn-primary rounded-full  p-2 felx items-center">
            <ModeEditIcon className="text-2xl" />
          </div>
        </li>
        <li className="flex items-center gap-4 min-w-[92px] justify-center">
          Tag
          <div className="bg-btn-primary rounded-full p-2 felx items-center justify-center">
            <TagIcon className="text-2xl" />
          </div>
        </li>
        <Link href="/create">
          <li className="flex items-center gap-4 justify-center min-w-[92px] ">
            Task
            <div className="bg-btn-primary rounded-full p-2 felx items-center">
              <TaskIcon className="text-2xl" />
            </div>
          </li>
        </Link>
      </ul>
      <div
        onClick={() => setClicked((click) => !click)}
        className={`transition-all absolute w-screen h-screen top-0 left-0 bg-slate-700/50 z-20 ${
          clicked ? "visible opacity-100" : "invisible opacity-0"
        }`}
      ></div>
    </div>
  );
}
