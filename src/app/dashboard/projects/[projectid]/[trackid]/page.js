"use client";
import SideBar from "@/app/components/SideBar";
import Project from "@/app/components/Project";
import Track from "@/app/components/Track";
import SignIn from "@/app/components/SignIn";
import { getAuth } from "firebase/auth";
import { db } from "../../../../../../firebase";
import { useContext } from "react";
import { UserContext } from "@/app/Context/UserContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SwipeableEdgeDrawer from "@/app/components/MobileBottomDrawer";
import Header from "@/app/components/Header";
import Loading from "@/app/components/Loading";

export default function TrackPage({ params }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const auth = getAuth();
  const { currentUser } = useContext(UserContext);
  if (currentUser != null) {
    return (
      <>
        {matches ? (
          <>
            <Header />
            <div className="mt-[64.8px] flex flex-grow">
              <SideBar />
              <Track />
            </div>
          </>
        ) : (
          <>
            <Header />
            <div className="mt-12 flex flex-grow flex-col ">
              <Track />
              <SwipeableEdgeDrawer />
            </div>
          </>
        )}
      </>
    );
  }
  return <Loading />;
}
