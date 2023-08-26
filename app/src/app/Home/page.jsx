"use client";
import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Infos from "../../Components/Infos";
import AddEmpoyee from "../../Components/AddEmpoyee";
import Image from "next/image";
import { styles } from "../../styles";
import { motion } from "framer-motion";
import { add_frame } from "../../Assets";
import SyncLoader from "react-spinners/SyncLoader";
import { useSession } from "next-auth/react";

//i need to secure the end point
const HomePage = () => {
  const [data, setData] = useState();
  const [fullData, setFullData] = useState();
  const [showInfos, setShowInfos] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const { data: session } = useSession();

  const getData = async () => {
    try {
      const res = await fetch(
        `https://sheet.best/api/sheets/6ea63e6c-960d-41c9-8abd-9902a235fa74?_format=index&_offset=1`,
        { next: { revalidate: 10 } } //ISR : Incrimental static generation (mixed of SSR''server side rendering' and SSG 'static site generation') =>perfect for dynamic content
      );
      const data = await res.json();
      setData(Object.keys(data).map((key) => data[key]));
      setFullData(Object.keys(data).map((key) => data[key]));
    } catch (error) {
      console.log(error);
    }
  };

  function handleFiltre(event) {
    const newData = fullData.filter(
      (row) =>
        row.nom.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.prenom.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.service.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.pc_bureau_marque
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        row.pc_bureau_model
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        row.pc_portable_marque
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        row.pc_portable_model
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        row.imprimente_multi_marque
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        row.imprimente_multi_model
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        row.imprimente_thermique_marque
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        row.imprimente_thermique_model
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        row.adresse_ip.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setData(newData);
  }

  useEffect(() => {
    console.log("session : ", session);
    getData();
  }, [showInfos]);
  return (
    <div className={`relative home min-h-screen ${styles.paddingX}`}>
      {showInfos && (
        <Infos
          setShowInfos={setShowInfos}
          selectedData={selectedData}
          setData={setData}
          data={data}
        />
      )}

      <AddEmpoyee showAdd={showAdd} setShowAdd={setShowAdd} />

      <div className={`py-20 ${styles.paddingX}`}>
        <div className="flex flex-row">
          <p className="text-[25px] font-semibold">Liste des employés</p>
          <div className="ml-auto">
            {session && session.user.canAdd && (
              <motion.button
                whileHover={{
                  y: -5,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
                }}
                whileTap={{ y: 0 }}
                onClick={() => setShowAdd(true)}
                className="add-btn flex flex-row gap-2 items-center justify-center"
              >
                <Image
                  className="w-[20px]"
                  alt="ajouter"
                  src={add_frame}
                ></Image>
                <p>Ajouter</p>
              </motion.button>
            )}
          </div>
        </div>
        <div className="flex justify-center mb-12">
          <motion.label
            animate={{
              boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
            }}
            className="flex flex-col text-[15px] w-[340px] mt-9 rounded-[20px]"
          >
            <input
              type="text"
              onChange={handleFiltre}
              placeholder="Filtrer les résultats"
              className="textbox rounded-[20px] py-3 px-6 font-medium"
            />
          </motion.label>
        </div>
        {!data ? (
          <SyncLoader
            className="mx-auto w-[100px] mt-36"
            color="#8fb3ff"
            speedMultiplier={0.7}
          />
        ) : (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <Table
              data={data}
              setSelectedData={setSelectedData}
              setShowInfos={setShowInfos}
            ></Table>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default HomePage;
