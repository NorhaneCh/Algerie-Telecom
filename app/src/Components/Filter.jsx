import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "../Constants";

const Filter = ({ data, setData, showFiltre, setShowFiltre }) => {
  let ref = useRef();
  const filtre = {
    firstName: "",
    lastName: "",
    service: "",
  };
 function handleFiltre(){
    setShowFiltre(false)
 }
  useEffect(() => {
    let handler = (e) => {
      if (!ref.current?.contains(e.target)) {
        setShowFiltre(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <AnimatePresence>
      {showFiltre && (
        <motion.div
          ref={ref}
          initial={{ y: -500 }}
          animate={{ y: 0 }}
          exit={{ y: -500 }}
          className="absolute z-1 top-20 left-[30%] p-9 flex flex-col gap-9  items-center rounded-xl border-2 border-light-gray bg-white"
        >
          <div className="flex flex-row items-start gap-6">
            <label className="rounded-[40px] flex flex-col text-[15px] w-[170px]">
              <input
                type="text"
                placeholder="Nom"
                onChange={(e) => (filtre.firstName = e.target.value)}
                className="filtre-box py-2 px-3 font-medium"
              />
            </label>
            <label className="rounded-[40px] flex flex-col text-[15px] w-[170px]">
              <input
                type="text"
                placeholder="Prénom"
                onChange={(e) => (filtre.lastName = e.target.value)}
                className="filtre-box py-2 px-2 font-medium"
              />
            </label>
            <div className="flex flex-col">
              <label className="rounded-[40px] flex flex-col text-[15px] w-[170px]">
                Service/Centre
              </label>
              <select id="pays" name="pays">
                <option value=""></option>
                {services.map((service) => (
                  <option value={service}>{service}</option>
                ))}
              </select>
            </div>
          </div>
          <motion.button 
          whileHover={{y:-5,
            boxShadow: "0px 5px 7px rgba(0, 0, 0, 0.25)",
        }}
          whileTap={{y:0}}
          className="submit-filtre-btn" type="submit" onClick={handleFiltre}>
            Filtre
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Filter;
