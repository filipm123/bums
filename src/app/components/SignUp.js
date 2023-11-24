"use client";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import app from "../../../firebase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "./Header";
import Link from "next/link";
const auth = getAuth();

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault(e);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        redirect("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="flex flex-grow p-16 flex-col items-center justify-center">
      <form onSubmit={handleRegister}>
        <Card variant="outlined">
          <div className="flex  flex-col w-112 gap-4 p-16">
            <strong className="text-2xl mb-4 text-center">
              Create your account
            </strong>
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
              Create account
            </Button>
          </div>
          <div className="text-center pb-12 ">
            Already have an account?
            <Link href="/signin">
              <div className="underline">Sign in</div>
            </Link>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default SignUp;
