"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { logo, person, settings, logout } from "../Assets";

const AppBar = () => {
  let ref = useRef()
  const [toggle, setToggle] = useState(false);
  const { data: session } = useSession();
useEffect(()=>{
  let handler = (e) => {
    if (!ref.current?.contains(e.target)) {
      setToggle(false);
    }
  };
  document.addEventListener("mousedown", handler);
  return () => {
    document.removeEventListener("mousedown", handler);
  };
})

  //console.log("is he loged in :", session?.user);
  return (
    <div className="app-bar flex flex-row p-3 top-0 z-10 backdrop-blur sticky" ref={ref}>
      <Image className="ml-0 w-[150px]" src={logo} alt="Algérie Télécom" />
      <div className="ml-auto flex flex-row gap-1 items-end justify-center">
        <p className="text-bold text-[17px]">Norhane</p>
        <p className="text-bold text-[17px]">Cherif</p>
        <Image
          className="w-[30px] hover:cursor-pointer"
          onClick={()=>setToggle(!toggle)}
          src={person}
        ></Image>
      </div>

      <div
        className={`${
          toggle ? "flex" : "hidden"
        } z-20 absolute top-16 right-4 flex flex-col items-start rounded-lg border-2 border-gray-color bg-white`}
      >
        <div
          className="flex flex-row gap-2 p-3 w-[200px] hover:cursor-pointer hover:bg-secondary border-b-2 border-gray-color"
          onClick={signOut}
        >
          <Image className="w-[20px] h-[20px]" src={logout}></Image>
          <p>Se déconnecter</p>
        </div>
        <div className="flex flex-row gap-2 p-3 w-[200px] hover:cursor-pointer hover:bg-secondary">
          <Image className="w-[20px] h-[20px]" src={settings}></Image>
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
