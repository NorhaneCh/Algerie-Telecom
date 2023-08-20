"use client";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { eye_off, eye, facebook,twitter,instagram,youtube,linkedin } from "../../../Assets/index";

const LoginPage = () => {
  const userName = useRef("");
  const pass = useRef("");

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "http://localhost:3000/Home",
    });
    console.log(JSON.stringify(result));
  };
  return (
    <div className="login-page h-screen flex flex-col lg:flex-row xl:flex-row lg:gap-40 xl:gap-40 gap-20 items-center justify-center pt-28 pb-28">
      <div>
        <span className="text-[45px] font-bold stroked-text">Algérie </span>
        <span className="text-[47px] font-bold text-gradient">Télécom</span>
        <p className="text-[30px] mt-4">Gérer votre parc informatique</p>
        <div className="flex flex-row gap-4 mt-[50%] justify-center ml-[-20%]">
          <a href="" target="_blanck"><Image className="w-[35px] hover:shadow-lg" src={facebook}></Image></a>
          <a href="" target="_blanck"><Image className="w-[35px] hover:shadow-lg" src={twitter}></Image></a>
          <a href="" target="_blanck"><Image className="w-[35px] hover:shadow-lg" src={youtube}></Image></a>
          <a href="" target="_blanck"><Image className="w-[35px] hover:shadow-lg" src={instagram}></Image></a>
          <a href="" target="_blanck"><Image className="w-[35px] hover:shadow-lg" src={linkedin}></Image></a>
          
        </div>
      </div>
      <div className="cnx p-9 flex flex-col gap-4 items-center">
        <p className="text-[30px] font-semibold text-black">Connexion</p>
        <label className="rounded-[40px] flex flex-col text-[17px] w-[340px] mt-9">
          <input
            type="email"
            name="email"
            onChange={(e) => (userName.current = e.target.value)}
            placeholder="Email"
            className="textbox py-3 px-6 font-medium"
          />
        </label>
        <label className="relative rounded-[40px] flex flex-col  text-[17px] w-[340px]">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={(e) => (pass.current = e.target.value)}
            placeholder="mot de pass"
            className="textbox py-3 px-6 font-medium"
          />
          <Image
            className="absolute top-4 right-3 bg-transparent w-[25px] hover:cursor-pointer"
            src={showPassword ? eye : eye_off}
            alt="frame"
            onClick={() => setShowPassword(!showPassword)}
          ></Image>
        </label>
        <motion.button
        whileHover={{
          y:-5,
          boxShadow : "0px 15px 25px rgba(0, 0, 0, 0.25)"
        }}
        transition={{duration :0.4}}
        className="cnx-btn mt-16" onClick={onSubmit}>
          Se Connecter
        </motion.button>
      </div>
    </div>
  );
};

export default LoginPage;
