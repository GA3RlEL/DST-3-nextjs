"use client";

const { useContext, useState, createContext } = require("react");

import { db } from "../firebase/firebase";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";

const CreateContext = createContext(null);

export default function CreateContextProvider({ children }) {
  const [selectTag, setSelectTag] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");

  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

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

  function handleDetails(e) {
    setDetails(e.target.value);
  }
  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleTag(e) {
    setSelectTag(e.target.value);
  }
  function handleDate(e) {
    setDate(e.format("DD/MM/YYYY"));
  }

  async function handleCreate(e) {
    try {
      setSending(true);
      e.preventDefault();
      await addDoc(collection(db, "tasks"), {
        title,
        body: details,
        date,
        tag: selectTag,
      });
      setTitle("");
      setDate("");
      setDetails("");
      setSelectTag("");
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <CreateContext.Provider
      value={{
        getTags,
        loading,
        error,
        tags,
        selectTag,
        title,
        details,
        date,
        handleDetails,
        handleTitle,
        handleTag,
        handleDate,
        handleCreate,
        sending,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
}
export function useCreateContext() {
  const context = useContext(CreateContext);
  if (!context) {
    throw new Error(
      "useCreateContext must be used within a ThemeContextProvider"
    );
  }
  return context;
}
