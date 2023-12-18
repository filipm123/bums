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
const auth = getAuth();
const style = {
 
  width: 400,
  bgcolor: 'black',
  border: "1px solid white",
  borderRadius: 2,
  boxShadow: 24,
  p: 1,
};

const SignIn = () => {
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
      <form onSubmit={handleSignIn}>
        <Card sx={style} variant="outlined">
          <div className="flex  flex-col w-112 gap-4 p-10">
            <strong className="text-2xl mb-4 text-center">Sign in</strong>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              required
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              size="small"
              required
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
