import React, { Fragment, useEffect, useRef } from "react";
import { useTask } from "../context/TaskContext";
import parse from "html-react-parser";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTagsContext } from "../context/TagsContext";
import { split } from "postcss/lib/list";
import Link from "./Link";

export default function TaskItem({ task, isPrevDate, isToday }) {
  const {
    isEditMode,
    handleSetEditTagId,
    handleEditTagContent,
    handleEditTitleContent,
    handleEditBodyContent,
    handleEditDateContent,
    takeItemToDelete,
  } = useTask();

  const { tags } = useTagsContext();

  const found = tags.find((tag) => tag.name === task.tag)?.color;

  function findLinks(detail) {
    let splittedDetails = detail.split(" ");

    let links = [];

    splittedDetails.forEach((el) => {
      if (el.startsWith("http")) links.push(el);
    });

    if (links.length > 0) {
      links.forEach((link) => {
        let indexesToChange = [];
        splittedDetails.forEach((el, index) => {
          if (el === link) {
            indexesToChange.push({
              link: el,
              index,
            });
          }
        });

        indexesToChange.forEach((item) => {
          splittedDetails[item.index] = <a href={item.link}>[LINK]</a>;
        });
      });
    }

    const parsedDetails = splittedDetails.map((element, index) => (
      <Fragment key={index}>{element} </Fragment>
    ));

    return parsedDetails;
  }

  return (
    <>
      <li className={`flex items-center justify-between`}>
        <div>
          {!isPrevDate && <h3>{isToday ? "Today" : task.date}</h3>}
          <div className="grid grid-cols-taksItemCol grid-rows-[1fr 1fr] gap-x-3">
            <h4
              className="font-bold"
              style={{ color: `${found ? found : "#000"}` }}
            >
              {task.tag}
            </h4>
            <h4 className="font-bold">{task.title}</h4>
            <p className=" col-start-2 text-secondary-color">
              {findLinks(task.body)}
            </p>
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
              <DeleteIcon
                onClick={() => takeItemToDelete(task.id, task.title)}
                className="text-red-600"
              />
            </button>
          </div>
        )}
      </li>
    </>
  );
}
