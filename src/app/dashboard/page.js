"use client";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { getAuth } from "firebase/auth";
import Dashboard from "../components/Dashboard";
import { redirect } from "next/navigation";
import SignIn from "../components/SignIn";
export default function DashboardPage() {
  const auth = getAuth();
  const { currentUser } = useContext(UserContext);
  if (currentUser != null) {
    return <Dashboard />;
  }
  return <SignIn />;
}
