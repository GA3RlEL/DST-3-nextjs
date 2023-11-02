"use client";

const { createContext, useContext, useState, useEffect } = require("react");

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const TagsContext = createContext(null);

export default function TagsContextProvider({ children }) {
  const [tagName, setTagName] = useState("");
  const [color, setColor] = useState("#000000");

  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const [success, setSuccess] = useState(false);

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
      const docRef = doc(db, "tags", deleteId);
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

  ////////////////////////////////////////

  // Checking if tag already exist

  const [isExist, setIsExist] = useState(false);

  function checkIfExist() {
    let exist = false;
    tags.find((tag) => {
      if (tag.name === tagName) exist = true;
    });

    if (exist) {
      setIsExist(true);
      return false;
    } else return true;
  }

  function clearError() {
    setError("");
    setIsExist(false);
  }

  ///////////////////////////////////////

  const getTags = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "tags"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let tagsArr = [];

        querySnapshot.forEach((tag) => {
          tagsArr.push({ ...tag.data(), id: tag.id });
        });
        setTags(tagsArr);
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  async function handleCreate(e) {
    try {
      setSending(true);
      e.preventDefault();
      if (!checkIfExist()) {
        throw new Error(`"${tagName}" tag already exist!`);
      }
      await addDoc(collection(db, "tags"), {
        name: tagName.toUpperCase(),
        color,
      });
      setSuccess(true);
      setTagName("");
      setColor("#000000");
      setError(false);
      setIsExist(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  }

  function handleColor(e) {
    setColor(e.target.value);
  }
  function handleTagName(e) {
    setTagName(e.target.value);
  }

  function handleCloseSuccess() {
    setSuccess(false);
  }

  return (
    <TagsContext.Provider
      value={{
        getTags,
        tags,
        loading,
        error,
        sending,
        tagName,
        color,
        handleColor,
        handleTagName,
        handleCreate,
        success,
        handleCloseSuccess,
        isDelete,
        setIsDelete,
        deleteName,
        takeItemToDelete,
        handleDelete,
        deleteLoading,
        cancelDelete,
        isExist,
        clearError,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
}

export function useTagsContext() {
  const context = useContext(TagsContext);
  if (!context) {
    throw new Error("useTagsContext must be used within a TagsContextProvider");
  }

  return context;
}
