"use client";
import SideBar from "@/app/components/SideBar";
import Project from "@/app/components/Project";
import SignIn from "@/app/components/SignIn";
import { getAuth } from "firebase/auth";
import { db } from "../../../../../firebase";
import { useContext } from "react";
import { UserContext } from "@/app/Context/UserContext";
export default function ProjectPage({ params }) {
  const auth = getAuth();
  const { currentUser } = useContext(UserContext);
  if (currentUser != null) {
    return (
      <div className='flex flex-grow'>
        <SideBar />
        <Project />
      </div>
    );
  }
  return <SignIn />;
}
