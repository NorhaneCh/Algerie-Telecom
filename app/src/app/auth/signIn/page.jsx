"use client";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  eye_off,
  eye,
  facebook,
  twitter,
  instagram,
  youtube,
  linkedin,
} from "../../../Assets/index";

const LoginPage = () => {
  const userName = useRef("");
  const pass = useRef("");

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "http://localhost:3000/accueil ",
    });
    // console.log(JSON.stringify(result));
  };
  return (
    <div className="login-page h-screen flex flex-col lg:flex-row xl:flex-row lg:gap-40 xl:gap-40 gap-20 items-center justify-center pt-28 pb-28">
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span className="text-[45px] font-bold stroked-text">Algérie </span>
          <span className="text-[47px] font-bold text-gradient">Télécom</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-[30px] mt-4"
        >
          Gérer votre parc informatique
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-row gap-4 mt-[50%] justify-center ml-[-20%]"
        >
          <a href="" target="_blanck">
            <Image className="w-[35px]" alt="facebook" src={facebook}></Image>
          </a>
          <a href="" target="_blanck">
            <Image className="w-[35px]" alt="twitter" src={twitter}></Image>
          </a>
          <a href="" target="_blanck">
            <Image className="w-[35px]" alt="youtube" src={youtube}></Image>
          </a>
          <a href="" target="_blanck">
            <Image className="w-[35px]" alt="instagram" src={instagram}></Image>
          </a>
          <a href="" target="_blanck">
            <Image className="w-[35px]" alt="linkedin" src={linkedin}></Image>
          </a>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="cnx p-9 flex flex-col gap-4 items-center"
      >
        <p className="text-[30px] font-semibold text-black">Connexion</p>
        <label className="rounded-[40px] flex flex-col text-[15px] w-[340px] mt-9">
          <input
            type="text"
            name="username"
            onChange={(e) => (userName.current = e.target.value)}
            placeholder="nom d'utilisateur"
            className="textbox rounded-[40px] py-3 px-6 font-medium"
          />
        </label>
        <label className="relative rounded-[40px] flex flex-col  text-[15px] w-[340px]">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={(e) => (pass.current = e.target.value)}
            placeholder="mot de pass"
            className="textbox rounded-[40px] py-3 px-6 font-medium"
          />
          <Image
            className="absolute top-3 right-3 bg-transparent w-[25px] hover:cursor-pointer"
            src={showPassword ? eye : eye_off}
            alt="frame"
            onClick={() => setShowPassword(!showPassword)}
          ></Image>
        </label>
        <motion.button
          whileHover={{
            y: -5,
            boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.25)",
          }}
          whileTap={{ y: 0 }}
          transition={{ duration: 0.4 }}
          className="cnx-btn mt-16"
          onClick={onSubmit}
        >
          Se Connecter
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LoginPage;
