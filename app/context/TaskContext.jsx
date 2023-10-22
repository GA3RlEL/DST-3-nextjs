"use client";

const { createContext, useContext, useState, useEffect } = require("react");

import dayjs from "dayjs";
import { db } from "../firebase/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";

const TaskContext = createContext(null);

export function TaskContentProvider({ children }) {
  // Basic funcionality (fetching data)
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

  /////////////////////////////////////////

  // edit mode

  const [isEditMode, setIsEditMode] = useState(true); // generally mode making visible icons

  ///////////////////////////////////////

  const [isEditElement, setIsEditElement] = useState(false);

  const [editTagId, setEditTagId] = useState(null);

  function handleSetEditTagId(id) {
    setEditTagId(id);
    setIsEditElement(true);
  }

  //Taking and updating tag
  const [editTagContent, setEditTagContent] = useState("");

  function handleEditTagContent(e) {
    setEditTagContent(e);
  }

  function updateTagContent(e) {
    setEditTagContent(e.target.value);
  }

  // Taking and updating title
  const [editTitleContent, setEditTitleContent] = useState("");
  function handleEditTitleContent(e) {
    setEditTitleContent(e);
  }
  function updateTitleContent(e) {
    setEditTitleContent(e.target.value);
  }

  //Taking and updating body
  const [editBodyContent, setEditBodyContent] = useState("");
  function handleEditBodyContent(e) {
    setEditBodyContent(e);
  }
  function updateBodyContent(e) {
    setEditBodyContent(e.target.value);
  }

  // Taking and updating date
  const [editDateContent, setEditDateContent] = useState("");
  function handleEditDateContent(e) {
    const date = new Date(e.split("/")[2], e.split("/")[1], e.split("/")[0]);
    setEditDateContent(dayjs(date));
  }
  function updateDateContent(e) {
    setEditDateContent(e);
  }

  ////////////////////////////////////

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sendingError, setSendingError] = useState("");

  /////////////////////////////////

  async function updateTask(e) {
    setSendingError("");
    e.preventDefault();
    try {
      setSending(true);
      const docRef = doc(db, "tasks", editTagId);
      updateDoc(docRef, {
        title: editTitleContent,
        body: editBodyContent,
        tag: editTagContent,
        date: editDateContent.format("DD/MM/YYYY"),
      });
      setSuccess(true);
      resetContents();
    } catch (error) {
      setSendingError(error.message);
      console.log(error);
    } finally {
      setSending(false);
    }
  }

  function handleCloseSuccess() {
    setSuccess(false);
  }

  ////////////////////////////////

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        resetContents();
      }
    });
  }, []);

  function resetContents() {
    setIsEditElement(false);
    setEditTagId(null);
    setEditTagContent("");
    setEditTitleContent("");
    setEditBodyContent("");
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        isEditMode,
        handleSetEditTagId,
        editTagId,
        handleEditTagContent,
        handleEditTitleContent,
        isEditElement,
        editTagContent,
        editTitleContent,
        updateTitleContent,
        updateTagContent,
        handleEditBodyContent,
        updateBodyContent,
        editBodyContent,
        handleEditDateContent,
        updateDateContent,
        editDateContent,
        sending,
        resetContents,
        updateTask,
        handleCloseSuccess,
        success,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask must be used within a ThemeContextProvider");
  }
  return context;
}
