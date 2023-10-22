"use client";

import AddButton from "../Components/AddButton";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Overlay from "../Components/Overlay";
import { useUserContext } from "../context/AuthContext";
import { useTask } from "../context/TaskContext";
import AddNotification from "./AddNotification";
import EditTaskForm from "./EditTaskForm";
import TicketList from "./TaskList";

export default function Home() {
  const { user } = useUserContext();
  const { isEditElement } = useTask();
  return (
    <>
      <div className="container max-w-full grid-rows-[auto_1fr_auto] relative">
        <Header />
        <main className="max-w-3xl mx-auto mb-2 px-4 w-full relative">
          <TicketList />
        </main>
        <Footer />
        {user && <AddButton />}
      </div>

      <EditTaskForm />
      <AddNotification />
      <Overlay />
    </>
  );
}
