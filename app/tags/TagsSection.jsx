import React from "react";
import TagsList from "./TagsList";
import TagCreate from "./TagCreate";

export default function TagsSection() {
  return (
    <div className="justify-self-center   max-w-3xl w-full px-3 grid grid-rows-[auto_1fr] gap-y-10 justify-center relative">
      <TagCreate />
      <TagsList />
    </div>
  );
}
