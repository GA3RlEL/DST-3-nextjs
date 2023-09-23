import TicketList from "./TaskList";
import Topbar from "./Topbar";

export default function Home() {
  return (
    <div className="container max-w-full grid-rows-[auto_auto_1fr_auto]">
      <Topbar />
      <main className="max-w-3xl mx-auto mb-2 px-4 w-full">
        <TicketList />
      </main>
      <footer className="place-self-center">Made with ❤ by K&K</footer>
    </div>
  );
}
