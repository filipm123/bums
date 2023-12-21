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
import Header from "../components/Header";
import Loading from "../components/Loading";
export default function DashboardPage() {
  const auth = getAuth();
  const { currentUser } = useContext(UserContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  if (currentUser) {
    return (
      <>
        {matches ? (
          <>
            <Header />
            <div className="mt-[64.8px] flex flex-grow">
              <SideBar />
              <Dashboard />
            </div>
          </>
        ) : (
          <>
            <Header />
            <div>
              <Dashboard />
              <SwipeableEdgeDrawer />
            </div>
          </>
        )}
      </>
    );
  }
  return <Loading/>;
}
