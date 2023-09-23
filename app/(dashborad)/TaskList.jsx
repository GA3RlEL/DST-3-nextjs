"use client";

import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import TaskItem from "../Components/TaskItem";
import { TailSpin } from "react-loader-spinner";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, "tasks"), orderBy("date", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let tasksArr = [];

          querySnapshot.forEach((doc) => {
            tasksArr.push({ ...doc.data(), id: doc.id });
          });
          setTasks(tasksArr);
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

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
