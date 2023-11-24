"use client";
import { getAuth } from "firebase/auth";
import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import app from "../../../firebase";
const auth = getAuth();

export const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
    console.log('Current user:', currentUser);
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
