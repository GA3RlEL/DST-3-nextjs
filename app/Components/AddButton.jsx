"use client";

import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

export default function AddButton() {
  const [visible, setVisible] = useState(true);

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
    <div className="">
      <button
        className={`transition-all w-16 h-16 rounded-full bg-btn-primary fixed bottom-3  right-3 md:right-1/4 ${
          visible ? "opacity-100  scale-100" : "opacity-0  -scale-50"
        }`}
      >
        <AddIcon className="text-white" />
      </button>
    </div>
  );
}
