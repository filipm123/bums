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
 
  width: 400,
  bgcolor: "#08070B",
  border: "1px solid #545363",
  borderRadius: 2,
  boxShadow: 24,
  p: 1,
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
    <div className="flex flex-grow p-16 flex-col items-center justify-center">
      <form onSubmit={handleRegister}>
        <Card sx={style} variant="outlined">
          <div className="flex  flex-col w-112 gap-4 p-10">
            <strong className="text-2xl mb-4 text-center">
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
          <div className="text-center pb-6 ">
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
