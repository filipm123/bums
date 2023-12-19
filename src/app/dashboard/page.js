"use client";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { getAuth } from "firebase/auth";
import Dashboard from "../components/Dashboard";
import SignIn from "../components/SignIn";
import SwipeableEdgeDrawer from "../components/MobileBottomDrawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SideBar from "../components/SideBar";
export default function DashboardPage() {
  const auth = getAuth();
  const { currentUser } = useContext(UserContext);
  const theme = useTheme();
  const matches = useMediaQuery(
    theme.breakpoints.up("sm") && theme.breakpoints.up("md"),
  );
  if (currentUser != null) {
    return (
      <>
        {matches ? (
          <div className="mt-[64.8px] flex flex-grow">
            <SideBar />
            <Dashboard />
          </div>
        ) : (
          <div>
            <Dashboard />
            <SwipeableEdgeDrawer />
          </div>
        )}
      </>
    );
  }
  return <SignIn />;
}
