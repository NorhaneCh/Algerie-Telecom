"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { logo, person, settings, logout, home } from "../Assets";

const AppBar = () => {
  let ref = useRef();
  const [toggle, setToggle] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    let handler = (e) => {
      if (!ref.current?.contains(e.target)) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  return (
    <div className="top-0 z-20 backdrop-blur sticky">
      {session && session.user && (
        <div className="app-bar flex flex-row p-3" ref={ref}>
          <Image className="ml-0 w-[150px]" src={logo} alt="Algérie Télécom" />
          <div className="ml-auto flex flex-row gap-1 items-end justify-center">
            <p className="text-[17px] font-medium">{session.user.lastName}</p>
            <p className="text-[17px] font-medium">{session.user.firstName}</p>
            <Image
              className="w-[30px] hover:cursor-pointer"
              onClick={() => setToggle(!toggle)}
              alt="utilisateur"
              src={person}
            ></Image>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`${
              toggle ? "flex" : "hidden"
            } z-20 absolute top-16 right-4 flex flex-col items-start rounded-lg border-2 border-gray-color bg-white`}
          >
            {session && session.user.isAdmin && (
              <div>
                <Link href="http://localhost:3000/home">
                  <div
                    className="flex flex-row gap-2 p-3 w-[200px] hover:cursor-pointer hover:bg-secondary"
                    onClick={() => setToggle(false)}
                  >
                    <Image className="w-[20px] h-[20px]" src={home}></Image>
                    <p>Accueil</p>
                  </div>
                </Link>
                <Link href="http://localhost:3000/paramaitre">
                  <div
                    className="flex flex-row gap-2 p-3 w-[200px] hover:cursor-pointer hover:bg-secondary"
                    onClick={() => setToggle(false)}
                  >
                    <Image className="w-[20px] h-[20px]" src={settings}></Image>
                    <p>Paramaitre</p>
                  </div>
                </Link>
              </div>
            )}

            <div
              className="flex flex-row gap-2 p-3 w-[200px] hover:cursor-pointer hover:bg-secondary border-b-2 border-gray-color"
              onClick={signOut}
            >
              <Image
                className="w-[20px] h-[20px]"
                alt="se déconnecter"
                src={logout}
              ></Image>
              <p>Se déconnecter</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AppBar;
