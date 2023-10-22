"use client";

import React from "react";

import TaskItem from "../Components/TaskItem";
import { TailSpin } from "react-loader-spinner";
import { useTask } from "../context/TaskContext";

export default function TaskList() {
  const { tasks, loading, error } = useTask();

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
        tasks.map((task) => <TaskItem key={task.id} task={task} />)}
    </ul>
  );
}
