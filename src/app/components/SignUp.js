"use client";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import PasswordChecklist from "react-password-checklist";
import { useRouter } from "next/navigation";
const auth = getAuth();
const style = {
  bgcolor: "black",
  borderRadius: 2,
  boxShadow: 24,
};
const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const handleRegister = (e) => {
    e.preventDefault(e);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: username,
          photoUrl: "",
        }).then(() => {
          router.push("/dashboard");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="flex flex-grow flex-col items-center justify-center p-16">
      <form onSubmit={handleRegister}>
        <Card sx={style} variant="outlined">
          <div className="w-112  flex flex-col gap-4 p-10">
            <strong className="mb-4 text-center text-2xl">
              Create your account
            </strong>
            <TextField
              onChange={(e) => setUsername(e.target.value)}
              id="outlined-basic"
              label="Username "
              variant="outlined"
              size="small"
              required
            />
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
            <TextField
              onChange={(e) => setPasswordAgain(e.target.value)}
              id="outlined-basic"
              label="Confirm password"
              variant="outlined"
              type="password"
              size="small"
              required
            />
            {password ? (
              <PasswordChecklist
                rules={["minLength", "number", "capital", "match"]}
                minLength={5}
                value={password}
                valueAgain={passwordAgain}
                onChange={(isValid) => {}}
              />
            ) : (
              <div></div>
            )}

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
          <div className="pb-6 text-center ">
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
