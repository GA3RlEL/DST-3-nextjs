import Image from "next/image";
import React from "react";
import ryanPic from "../../../images/joi.jpeg";
import lookLonely from "../../../images/lookLonely.jpg";
import AnimatedTextPcSize from "./AnimatedTextPcSize";

export default function Login() {
  return (
    <div className="relative">
      <div className="lg:hidden">
        <Image
          src={ryanPic}
          alt="Picture of Ryan"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      <form className="w-screen h-screen items-center relative">
        <div className="hidden lg:block z-0">
          <Image
            src={lookLonely}
            alt="You look lonely picture"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>

        <div className="w-full h-full top-0 left-0 bg-gray-600 opacity-80 z-10"></div>

        <div className="flex flex-col gap-4 absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="hidden lg:block">
            <AnimatedTextPcSize />
          </div>

          <div className="lg:hidden">
            <h1 className="text-3xl">You Look Lonely</h1>
            <h2 className="text-xl">We can fix that!</h2>
          </div>

          <div>
            <input
              type="text"
              placeholder="Type your username"
              className="bg-gray-200 w-80 p-3"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Type your password"
              className="bg-gray-200 w-80 p-3"
            />
          </div>

          <div>
            <button className="bg-btn-primary w-80 p-2">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}
