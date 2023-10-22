import React, { useEffect, useRef } from "react";
import { useTask } from "../context/TaskContext";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskItem({ task }) {
  const {
    isEditMode,
    handleSetEditTagId,
    handleEditTagContent,
    handleEditTitleContent,
    handleEditBodyContent,
    handleEditDateContent,
  } = useTask();

  return (
    <>
      <li className={`flex items-center justify-between`}>
        <div>
          <h3>{task.date}</h3>
          <div className="grid grid-cols-taksItemCol grid-rows-2 gap-x-3">
            <h4 className="font-bold">{task.tag}</h4>
            <h4 className="font-bold">{task.title}</h4>
            <p className="col-start-2 text-secondary-color">{task.body}</p>
          </div>
        </div>
        {isEditMode && (
          <div className={`flex gap-3 `}>
            <button
              onClick={() => {
                handleSetEditTagId(task.id);
                handleEditTagContent(task.tag);
                handleEditTitleContent(task.title);
                handleEditBodyContent(task.body);
                handleEditDateContent(task.date);
              }}
            >
              <ModeEditIcon />
            </button>
            <button>
              <DeleteIcon className="text-red-600" />
            </button>
          </div>
        )}
      </li>
    </>
  );
}
