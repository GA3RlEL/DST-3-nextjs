"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import ryanPic from "../../../images/joi.jpeg";
import lookLonely from "../../../images/lookLonely.jpg";
import AnimatedTextPcSize from "./AnimatedTextPcSize";
import { useUserContext } from "@/app/context/AuthContext";
import ErrorDetect from "./ErrorDetect";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebase/firebase";
import { useThemeUI } from "@/app/context/ThemeUIContext";

export default function Login() {
  const { mode } = useThemeUI();
  const {
    loginEmail,
    loginPassword,
    handleLoginEmail,
    handleLoginPassword,
    signIn,
  } = useUserContext();

  const router = useRouter();

  const [render, setRender] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, function (user) {
      if (user) {
        router.push("/");
        router.refresh();
      } else {
        setRender(true);
      }
    });
  }, [router]);

  return (
    <>
      {render && (
        <>
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

            <form
              className="w-screen h-screen items-center relative"
              onSubmit={signIn}
            >
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

                <div className="lg:hidden text-white">
                  <h1 className="text-3xl">You Look Lonely</h1>
                  <h2 className="text-xl">We can fix that!</h2>
                </div>

                <div>
                  <input
                    value={loginEmail}
                    onChange={handleLoginEmail}
                    type="text"
                    placeholder="Type your email"
                    className={`bg-gray-200 w-80  p-3 ${
                      mode === "dark" && "text-black"
                    }`}
                  />
                </div>

                <div>
                  <input
                    value={loginPassword}
                    onChange={handleLoginPassword}
                    type="password"
                    placeholder="Type your password"
                    className={`bg-gray-200 w-80  p-3 ${
                      mode === "dark" && "text-black"
                    }`}
                  />
                </div>

                <div>
                  <button className="bg-btn-primary w-80 p-2">Login</button>
                </div>
              </div>
            </form>
          </div>
          <ErrorDetect />
        </>
      )}
    </>
  );
}
