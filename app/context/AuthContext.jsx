"use client";

const { createContext, useContext, useState, useEffect } = require("react");
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Handling errors
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  function clearError() {
    setIsError(false);
    setError("");
  }

  /////////////////////////////////////

  // Updating login credentials
  function handleLoginEmail(e) {
    setLoginEmail(e.target.value);
  }

  function handleLoginPassword(e) {
    setLoginPassword(e.target.value);
  }

  //////////////////////////////

  // Log in function

  function signIn(e) {
    e.preventDefault();
    setError("");
    setIsError(false);
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {})
      .catch((error) => {
        setError(error.message);
        setIsError(true);
      });
  }

  ///////////////////////////

  // logOut function //////////

  function logOut() {
    if (user) {
      signOut(auth);
      router.refresh();
    }
  }

  //////////////////////////

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginEmail,
        loginPassword,
        handleLoginEmail,
        handleLoginPassword,
        signIn,
        logOut,
        isError,
        clearError,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserContext must be used within a TagsContextProvider");
  }

  return context;
}
