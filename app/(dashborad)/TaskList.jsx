"use client";

import React from "react";

import TaskItem from "../Components/TaskItem";
import { TailSpin } from "react-loader-spinner";
import { useTask } from "../context/TaskContext";

export default function TaskList() {
  const { tasks, loading, error } = useTask();

  let isPrevDate = false;
  let prevDate = 3;

  return (
    <ul
      className={` ${
        (error || loading) && "h-full flex justify-center items-center"
      }`}
    >
      {error && <div className="text-center">{error}</div>}
      {loading && <TailSpin />}
      {!error &&
        !loading &&
        tasks.map((task) => {
          if (prevDate === task.timestamp_create) {
            isPrevDate = true;
            prevDate = task.timestamp_create;
          } else {
            isPrevDate = false;
            prevDate = task.timestamp_create;
          }
          return <TaskItem isPrevDate={isPrevDate} key={task.id} task={task} />;
        })}
    </ul>
  );
}
