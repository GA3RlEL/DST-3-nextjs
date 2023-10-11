import React from "react";

import BackArrow from "../Components/BackArrow";
import Footer from "../Components/Footer";
import AddNotification from "./AddNotification";
import Header from "../Components/Header";
import TagsSection from "./TagsSection";
import ConfirmDelete from "./ConfirmDelete";

export default function Tags() {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto]">
      <Header>
        <BackArrow />
      </Header>
      <TagsSection />
      <Footer />
      <AddNotification>Tag</AddNotification>
      <ConfirmDelete />
    </div>
  );
}
