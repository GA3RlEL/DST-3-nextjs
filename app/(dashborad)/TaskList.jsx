"use client";

import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import TaskItem from "../Components/TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, "tasks"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let tasksArr = [];

        querySnapshot.forEach((doc) => {
          tasksArr.push({ ...doc.data(), id: doc.id });
        });
        setTasks(tasksArr);
      });
    };
    getData();
  }, []);

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
