"use client";

import React from "react";

import TaskItem from "../Components/TaskItem";
import { TailSpin } from "react-loader-spinner";
import { useTask } from "../context/TaskContext";
import { Island_Moments } from "next/font/google";

export default function TaskList() {
  const { tasks, loading, error, isLoaded, hasTasks } = useTask();

  let isPrevDate = false;
  let isToday = false;
  let prevDate = 3;

  // console.log(`error: ${error} hasTasks: ${hasTasks}`);

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  function parseDate(dateString) {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`);
  }

  return (
    <ul
      className={` ${
        (error || loading) && "h-full flex justify-center items-center"
      }`}
    >
      {error && <div className="text-center">{error}</div>}
      {loading && !isLoaded && <TailSpin />}
      {!error &&
        isLoaded &&
        tasks.map((task) => {
          if (parseDate(task.date) < parseDate(formattedDate)) return;

          if (formattedDate === task.date) {
            isToday = true;
          }
          if (formattedDate !== task.date) {
            isToday = false;
          }
          if (prevDate === task.timestamp_create) {
            isPrevDate = true;
            prevDate = task.timestamp_create;
          } else {
            isPrevDate = false;
            prevDate = task.timestamp_create;
          }
          return (
            <TaskItem
              isPrevDate={isPrevDate}
              isToday={isToday}
              parsedDate={parseDate(task.date)}
              key={task.id}
              task={task}
            />
          );
        })}
      {!loading && !hasTasks && (
        <h1 className="text-center ">
          There are no entries, enjoy free time dear students
        </h1>
      )}
    </ul>
  );
}
