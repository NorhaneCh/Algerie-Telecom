"use client";
import { useSession } from "next-auth/react";
import LoginPage from "./auth/signIn/page";
import HomePage from "./home/page";

const WelcomePage = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return <HomePage/>;
  } else {
    return <LoginPage/>;
  }
};

export default WelcomePage;
