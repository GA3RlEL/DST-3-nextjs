"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import BackArrow from "../Components/BackArrow";
import Footer from "../Components/Footer";
import AddNotification from "./AddNotification";
import Header from "../Components/Header";
import TagsSection from "./TagsSection";
import ConfirmDelete from "./ConfirmDelete";
import ErrorDetect from "./ErrorDetect";
import { useRouter } from "next/navigation";

import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Tags() {
  const router = useRouter();

  const [render, setRender] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, function (user) {
      if (!user) {
        router.push("/");
        router.refresh();
      } else {
        setRender(true);
      }
    });
  }, [router]);

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto]">
      {render && (
        <>
          <Header>
            <BackArrow />
          </Header>
          <TagsSection />
          <Footer />
          <AddNotification>Tag</AddNotification>
          <ConfirmDelete />
          <ErrorDetect></ErrorDetect>
        </>
      )}
    </div>
  );
}
