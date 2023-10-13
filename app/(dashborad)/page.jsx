"use client";

import AddButton from "../Components/AddButton";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useUserContext } from "../context/AuthContext";
import TicketList from "./TaskList";

export default function Home() {
  const { user } = useUserContext();
  return (
    <div className="container max-w-full grid-rows-[auto_1fr_auto] relative">
      <Header />
      <main className="max-w-3xl mx-auto mb-2 px-4 w-full relative">
        <TicketList />
      </main>
      <Footer />
      {user && <AddButton />}
    </div>
  );
}
