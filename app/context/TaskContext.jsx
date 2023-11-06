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
  deleteDoc,
} from "firebase/firestore";

const TaskContext = createContext(null);

export function TaskContentProvider({ children }) {
  // Basic funcionality (fetching data)
  const [tasks, setTasks] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasTasks, setHasTasks] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const q = query(
          collection(db, "tasks"),
          orderBy("timestamp_create", "asc")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let tasksArr = [];

          querySnapshot.forEach((doc) => {
            tasksArr.push({ ...doc.data(), id: doc.id });
          });
          setHasTasks(tasksArr.length > 0);
          setTasks(tasksArr);
          setIsLoaded(true);
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

  const [isEditMode, setIsEditMode] = useState(); // generally mode making visible icons

  useEffect(() => {
    const editFromLocalStorage = localStorage.getItem("edit");
    if (editFromLocalStorage) {
      setIsEditMode(editFromLocalStorage);
    } else {
      setIsEditMode(false);
      localStorage.setItem("edit", false);
    }
  }, []);

  function handleIsEditMode() {
    if (isEditMode === "false") {
      setIsEditMode("true");
      localStorage.setItem("edit", "true");
    }
    if (isEditMode === "true") {
      setIsEditMode("false");
      localStorage.setItem("edit", "false");
    }
  }

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
    const date = new Date(
      e.split("/")[2],
      e.split("/")[1] - 1,
      e.split("/")[0]
    );
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

  function convertDateToTimestamp(dateString) {
    const dateParts = dateString.split("/");
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);

    const dateObject = new Date(year, month, day);
    return dateObject.getTime();
  }

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
        timestamp_create: convertDateToTimestamp(
          editDateContent.format("DD/MM/YYYY")
        ),
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

  // Delete Logic
  const [isDelete, setIsDelete] = useState(false);
  const [deleteName, setDeleteName] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  function takeItemToDelete(id, name) {
    setIsDelete(true);
    setDeleteName(name);
    setDeleteId(id);
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      setDeleteLoading(true);
      const docRef = doc(db, "tasks", deleteId);
      await deleteDoc(docRef);
    } catch (error) {
      setDeleteError(error);
      console.log(error);
    } finally {
      setDeleteLoading(false);
      setIsDelete(false);
      setDeleteName("");
      setDeleteId("");
    }
  }

  function cancelDelete() {
    setIsDelete(false);
    setDeleteName("");
    setDeleteId("");
  }

  /////////////////////////////////////////////////////

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
        isDelete,
        deleteName,
        deleteLoading,
        takeItemToDelete,
        handleDelete,
        cancelDelete,
        handleIsEditMode,
        isLoaded,
        hasTasks,
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
