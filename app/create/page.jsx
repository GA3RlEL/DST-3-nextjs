import AddNotification from "./AddNotification";
import BackArrow from "../Components/BackArrow";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

import CreateForm from "./CreateForm";
export default function CreateTask() {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto]">
      <Header>
        <BackArrow />
      </Header>
      <CreateForm />
      <Footer />

      <AddNotification>Task</AddNotification>
    </div>
  );
}
