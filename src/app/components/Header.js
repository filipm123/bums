"use client";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { getAuth } from "firebase/auth";
import React from "react";
import { useRouter } from "next/navigation";
import OptionsMenu from "./OptionsMenu";
const Header = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const auth = getAuth();
  const { currentUser } = useContext(UserContext);

  const handleLogout = () => {
    auth.signOut();
    router.push("/");
  };
  return (
    <header className="z-40 fixed w-full border-b-[1px] border-br bg-black p-4">
      <nav className="flex items-center justify-between">
        <div className="flex gap-12">
          <strong className="text-2xl">BUMS</strong>

          {matches ? (
            <Link className="flex items-center text-sm" href="/dashboard">
              <p>Dashboard</p>
            </Link>
          ) : (
            <></>
          )}
        </div>

        {currentUser ? (
          <>
            <div className="flex gap-2">
              <OptionsMenu handleLogout={handleLogout} />
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-2">
              <Link href="/signin">Sign in</Link>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};
export default Header;
