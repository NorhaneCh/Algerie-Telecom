"use client";

import { signOut, useSession } from "next-auth/react";
import { person } from "../Assets";
import Image from "next/image";

const SigninButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="flex flex-row gap-20 ml-auto bg-transparent">
        <div className="flex flex-row items-center gap-1 bg-transparent">
          <Image
            className="bg-transparent w-[30px] h-[30px]"
            src={person}
          ></Image>
          <p className="bg-transparent text-bold text-[17px]">
            {session.user.name}
          </p>
        </div>

        <button onClick={() => signOut()} className="text-red-600"></button>
      </div>
    );
  }
};

export default SigninButton;
