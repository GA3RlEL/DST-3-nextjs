"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function AnimatedTextPcSize() {
  return (
    <div className="text-white font-bold mb-8">
      <TypeAnimation
        sequence={["You look lonely", 2000, "We can fix that!", 2000]}
        wrapper="span"
        speed={50}
        style={{ fontSize: "2rem", display: "inline-block" }}
        repeat={Infinity}
      />
    </div>
  );
}
