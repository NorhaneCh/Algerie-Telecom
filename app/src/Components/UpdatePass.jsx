"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { eye_off, eye } from "../Assets/index";

const UpdatePass = () => {
  const { data: session } = useSession();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  ///////////////////////////////////////////////////////////
  const updatePass = async (password) => {
    const username = session.user.username;
    const firstLog = false;
    const updatedUser = await fetch(
      "http://localhost:3000/api/users/updatePass",
      {
        body: JSON.stringify({ username, password, firstLog }),
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  ///////////////////////////////////////////////////////////
  const handleUpdatePass = async () => {
    updatePass(password);
    signOut();
  };
  ///////////////////////////////////////////////////////////
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="backdrop relative"
      >
        <div>
          <div className="box flex flex-col gap-12 items-center pt-16 absolute lg:top-24 xl:top-36 left-[30%] lg:w-[40%] xl:w-[35%] xl:left-[32%] h-[350px] rounded-xl">
            <div className="flex flex-col gap-2 items-center">
              <p className="text-[17px] text-red-500">
                Vous devez changer votre mot de pass !
              </p>
              <p className="text-[17px] font-medium">
                vous veillez reconnecter aprés la confirmation
              </p>
            </div>

            <label className="relative flex flex-col text-[15px] w-[300px]">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="entrez le nouveau mot de pass"
                className="textbox rounded-[13px] py-2 px-3 font-medium"
              />
              <Image
                className="absolute top-3 right-2 bg-transparent w-[20px] hover:cursor-pointer"
                src={showPassword ? eye : eye_off}
                alt="frame"
                onClick={() => setShowPassword(!showPassword)}
              ></Image>
            </label>
            <button
              className="py-1 px-3 rounded-xl h-9 bg-gray-600 text-white hover:bg-black text-[15px]"
              onClick={handleUpdatePass}
            >
              confirmer
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdatePass;
