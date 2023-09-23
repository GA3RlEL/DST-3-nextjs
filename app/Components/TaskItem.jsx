import React from "react";

export default function TaskItem({ task }) {
  return (
    <li>
      <h3>{task.date}</h3>
      <div className="grid grid-cols-taksItemCol grid-rows-2 gap-x-3">
        <h4 className="font-bold">{task.tag}</h4>
        <h4 className="font-bold">{task.title}</h4>
        <p className="col-start-2 text-secondary-color">{task.body}</p>
      </div>
    </li>
  );
}
