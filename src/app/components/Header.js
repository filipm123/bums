"use client";

import { useTheme } from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

import Link from "next/link";
import { UserAuth } from "../Context/UserContext";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { getAuth, signOut } from "firebase/auth";
import Button from "@mui/material/Button";
import app from "../../../firebase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useRouter } from "next/navigation";
import OptionsMenu from "./OptionsMenu";
const Header = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const auth = getAuth();
  const { currentUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    auth.signOut();
    router.push("/");
  };
  return (
    <header className="h-20 p-10 pb-20 bg-black border-b-[1px] border-br">
      <nav className="flex justify-between items-center">
        <div className="flex gap-12">
          <Link href="/">
            <strong className="text-2xl">BUMS</strong>
          </Link>

          {matches ? (
            <Link className="flex items-center" href="/dashboard">
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
