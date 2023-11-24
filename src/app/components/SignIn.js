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
import { redirect } from "next/navigation";
const auth = getAuth();

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault(e);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <form onSubmit={handleSignIn}>
        <Card variant="outlined">
          <div className="flex  flex-col w-112 gap-4 p-16">
            <strong className="text-2xl mb-4 text-center">Sign in</strong>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              size="small"
            />
            <Button
              type="submit"
              disableElevation
              color="primary"
              variant="outlined"
              size="large"
            >
              Sign in
            </Button>
          </div>
          <div className="text-center pb-12 ">
            Don't have an account?
            <Link href="/signup">
              <div className="underline">Sign up</div>
            </Link>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default SignIn;
