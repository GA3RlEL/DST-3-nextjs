"use client";

import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Header from "./Header";

export default function Topbar() {
  const [isVisibleHeader, setIsVisibleHeader] = useState(true);

  return (
    <>
      <Header setIsVisibleHeader={setIsVisibleHeader} />
      <Navbar isVisibleHeader={isVisibleHeader} />
    </>
  );
}
