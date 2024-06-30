"use client";
import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Infos from "../../Components/Infos";
import AddEmployee from "../../Components/AddEmployee";
import UpdatePass from "../../Components/UpdatePass";
import Image from "next/image";
import { styles } from "../../styles";
import { motion } from "framer-motion";
import { add_frame } from "../../Assets";
import SyncLoader from "react-spinners/SyncLoader";
import { useSession } from "next-auth/react";

//i need to secure the end point
const HomePage = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [showInfos, setShowInfos] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const { data: session } = useSession();

  {
    /* const getData = async () => {
    try {
      const res = await fetch(
        `https://sheet.best/api/sheets/6ea63e6c-960d-41c9-8abd-9902a235fa74?_format=index`,
        { next: { revalidate: 10 } } //ISR : Incrimental static generation (mixed of SSR''server side rendering' and SSG 'static site generation') =>perfect for dynamic content
      );
      const data = await res.json();
      setData(Object.keys(data).map((key) => data[key]));
      setFullData(Object.keys(data).map((key) => data[key]));
    } catch (error) {
      console.log(error);
    }
  };*/
  }
  //////////////////////////////////////////////////////////
  const getData = async () => {
    const data = await fetch(
      "http://localhost:3000/api/employee/getEmployees",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((value) => {
        setFullData(value);
        setData(value);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  /////////////////////////////////////////////////////////////////////////////

  function handleFiltre(search) {
    const newData = fullData.filter(
      (row) =>
        row.nom.toLowerCase().includes(search.toLowerCase()) ||
        row.prenom.toLowerCase().includes(search.toLowerCase()) ||
        row.service.toLowerCase().includes(search.toLowerCase()) ||
        row.pc_bureau_marque.toLowerCase().includes(search.toLowerCase()) ||
        row.pc_bureau_model.toLowerCase().includes(search.toLowerCase()) ||
        row.pc_portable_marque.toLowerCase().includes(search.toLowerCase()) ||
        row.pc_portable_model.toLowerCase().includes(search.toLowerCase()) ||
        row.imprimante_multi_marque
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        row.imprimante_multi_model
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        row.imprimante_thermique_marque
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        row.imprimante_thermique_model
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        row.adresse_ip.toLowerCase().includes(search.toLowerCase())
    );
    setData(newData);
  }

  useEffect(() => {
    getData();
    if (data) {
      setTimeout(() => {
        setShowLoader(false);
      }, 2000);
    }
  },[]);
  return (
    <div className={`relative home min-h-screen ${styles.paddingX}`}>
      {!(session && session.user.firstLog) && (
        <div>
          {showInfos && (
            <Infos
              setShowInfos={setShowInfos}
              selectedData={selectedData}
              setSelectedData={setSelectedData}
              setData={setData}
              data={data}
            />
          )}
          {showAdd && <AddEmployee setShowAdd={setShowAdd} data={data} />}

          <div className={`py-20 ${styles.paddingX}`}>
            <div className="flex flex-row">
              <p className="text-[25px] font-semibold">Liste des employés</p>
              <div className="ml-auto">
                {session && session.user.canAdd ? (
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
                ) : null}
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
                  onChange={(e) => handleFiltre(e.target.value)}
                  placeholder="Filtrer les résultats"
                  className="textbox rounded-[20px] py-3 px-6 font-medium"
                />
              </motion.label>
            </div>
            {showLoader ? (
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
      )}
      {session && session.user.firstLog && <UpdatePass />}
    </div>
  );
};
export default HomePage;
