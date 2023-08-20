"use client";
import { useSession } from "next-auth/react";
import LoginPage from "./auth/signIn/page";
import HomePage from "./Home/page";

const WelcomePage = () => {
  const { data: session } = useSession();
  console.log(session?.user);

  if (session && session.user) {
    return <HomePage />;
  }
  return <LoginPage />;
};

export default WelcomePage;
