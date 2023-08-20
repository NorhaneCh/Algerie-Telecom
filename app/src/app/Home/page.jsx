"use client";
import React, { useEffect, useRef, useState } from "react";
import Table from "../../Components/Table";
import AppBar from "../../Components/AppBar";
import Infos from "../../Components/Infos";
import Filtre from "../../Components/Filter"
import Image from "next/image";
import { styles } from "../../styles";
import { motion } from "framer-motion";
import { filtre_icon, add_frame , search_icon} from "../../Assets";

//i need to secure the end point
const HomePage = () => {
  let ref = useRef();
  function handleChange() {}

  function addEmployee() {}

  const [data, setData] = useState();
  const [fullData , setFullData] = useState();
  const [showInfos, setShowInfos] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [showFiltre, setShowFiltre] = useState(false)
  const getData = async () => {
    try {
      const res = await fetch(
        "https://sheet.best/api/sheets/6ea63e6c-960d-41c9-8abd-9902a235fa74"
      );
      const data = await res.json();
      setData(data);
      setFullData(data);
    } catch (error) {
      console.log(error);
    }
  };
  function handleSearch(event) {
    const newData = fullData.filter(row => (row.nom.toLowerCase().includes(event.target.value.toLowerCase()))||(row.prenom.toLowerCase().includes(event.target.value.toLowerCase())))
    setData(newData);
  }
  useEffect(() => {
    getData();
  },[]);
  return (
    <div className="relative">
      <AppBar />
      <Filtre data={data} setData={setData} showFiltre={showFiltre} setShowFiltre={setShowFiltre}/>
      <Infos
        showInfos={showInfos}
        setShowInfos={setShowInfos}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
      <div className={`py-20 ${styles.paddingX}`}>
        <div className="flex flex-row">
          <p className="text-[25px] font-semibold">Liste des employés</p>
          <div className="ml-auto flex flex-row gap-4 items-center">
            <motion.button
              whileHover={{
                y: -5,
                boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.25)",
              }}
              whileTap={{ y: 0 }}
              className="filtre-btn flex flex-row gap-2 items-center justify-center"
              onClick={()=>setShowFiltre(true)}
            >
              <Image className="w-[20px]" src={filtre_icon}></Image>
              <p>Filtre</p>
            </motion.button>
            <motion.button
              whileHover={{
                y: -5,
                boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.25)",
              }}
              whileTap={{ y: 0 }}
              className="add-btn flex flex-row gap-2 items-center justify-center"
            >
              <Image className="w-[20px]" src={add_frame}></Image>
              <p>Ajouter</p>
            </motion.button>
          </div>
        </div>
        <div className="flex justify-center mb-12">
          
        <label className="flex flex-col text-[15px] w-[340px] mt-9">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Filtrer les résultat"
            className="textbox2 py-3 px-6 font-medium"
          />
        </label>
        </div>
        <Table
          data={data}
          setSelectedData={setSelectedData}
          setShowInfos={setShowInfos}
        ></Table>
      </div>
    </div>
  );
};
export default HomePage;
