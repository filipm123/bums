"use client";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import app from "../../../firebase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "./Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
const auth = getAuth();
const style = {
  bgcolor: "black",
  borderRadius: 2,
  boxShadow: 24,
};

const SignIn = () => {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault(e);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      
    </div>
  );
};

export default SignIn;
