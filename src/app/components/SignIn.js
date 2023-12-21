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
      <form onSubmit={handleSignIn}>
        <Card sx={style} variant="outlined">
          <div className="w-112  flex flex-col gap-4 p-10">
            <strong className="mb-4 text-center text-2xl">Sign in</strong>
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
          <div className="pb-12 text-center ">
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
