"use client";

import AddNotification from "./AddNotification";
import BackArrow from "../Components/BackArrow";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

import CreateForm from "./CreateForm";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
export default function CreateTask() {
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
          <CreateForm />
          <Footer />

          <AddNotification>Task</AddNotification>
        </>
      )}
    </div>
  );
}
