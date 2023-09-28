"use client";

const { createContext, useContext, useState } = require("react");

import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
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

  const [timer, setTimer] = useState(0);

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

  async function handleCreate(e) {
    try {
      setSending(true);
      e.preventDefault();
      await addDoc(collection(db, "tags"), {
        name: tagName,
        color,
      });
      setSuccess(true);
      setTagName("");
      setColor("#000000");
      if (t) {
        clearTimeout(t);
      }
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
        timer,
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
