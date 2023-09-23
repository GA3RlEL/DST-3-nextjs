import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <Header />
      <div className="self-center max-w-sm flex flex-col gap-3 justify-self-center">
        <h1 className="text-4xl text-center font-bold">Oops!</h1>
        <h3 className="text-2xl">404 - Page not found :(</h3>
        <p className="text-center">
          Back to{" "}
          <Link className="underline font-bold" href="/">
            Home
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}
