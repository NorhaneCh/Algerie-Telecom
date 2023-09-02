"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Checkbox } from "./Checkbox";
import Image from "next/image";
import { pcMarques, services, imprimanteMarques } from "../Constants";
import {
  true_icon,
  false_icon,
  modify_icon,
  download_icon,
  save_icon,
  delete_icon,
} from "../Assets";

const Infos = ({ setShowInfos, selectedData, setData, data }) => {
  const [employee, setEmployee] = useState({
    nom: "",
    prenom: "",
    service: "",
    pc_bureau: "",
    pc_bureau_marque: "",
    pc_bureau_model: "",
    pc_bureau_ns: "",
    pc_bureau_immo: "",
    pc_bureau_se: "",
    pc_bureau_ram: "",
    pc_bureau_etat: "",
    pc_portable: "",
    pc_prtable_marque: "",
    pc_prtable_model: "",
    pc_prtable_ns: "",
    pc_prtable_immo: "",
    pc_prtable_se: "",
    pc_prtable_ram: "",
    pc_prtable_etat: "",
    imprimante_multifonctions: "",
    imprimante_multi_marque: "",
    imprimante_multi_model: "",
    imprimante_multi_ns: "",
    imprimante_multi_immo: "",
    imprimante_multi_type_config: "",
    imprimante_multi_adresse_ip: "",
    imprimante_multi_etat: "",
    imprimante_simple: "",
    imprimante_simple_marque: "",
    imprimante_simple_model: "",
    imprimante_simple_ns: "",
    imprimante_simple_immo: "",
    imprimante_simple_type_config: "",
    imprimante_simple_adresse_ip: "",
    imprimante_simple_etat: "",
    imprimante_thermique: "",
    imprimante_thermique_marque: "",
    imprimante_thermique_model: "",
    imprimante_thermique_ns: "",
    imprimante_thermique_immo: "",
    imprimante_thermique_type_config: "",
    imprimante_thermique_adresse_ip: "",
    imprimante_thermique_etat: "",
    scanner: "",
    adresse_ip: "",
    securisation: "",
    date_ajout: "",
    ajouté_par: "",
    date_modif: "",
    modifié_par: "",
  });

  const [modify, setModify] = useState(false);
  const [pcBureau, setPcBureau] = useState(false);
  let ref1 = useRef();
  let ref2 = useRef();
  const [confirm, setConfirm] = useState(false);
  const Confirmation = () => {
    useEffect(() => {
      setTimeout(() => {
        setConfirm(false);
      }, 4000);
    });
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-1/2 left-[40%] w-[300px] h-[200px] bg-white box flex flex-col gap-12"
        >
          <p className="text-[30px] font-semibold">Supprimé</p>
        </motion.div>
      </AnimatePresence>
    );
  };

  ///////////////////////////////////////////////////////////////////////////////
  const handleDelete = async (rowId) => {
    fetch(
      `https://sheet.best/api/sheets/6ea63e6c-960d-41c9-8abd-9902a235fa74/${
        rowId - 1
      }`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then(() => {
        const updatedData = data.filter((row) => row.id !== rowId);

        setData(updatedData);
      })
      .then(setShowInfos(false))
      .then(setConfirm(true))
      .then(console.log("confirm : ", confirm))
      .catch((error) => {
        console.error(error);
      });
  };
  /////////////////////////////////////////////////////////////////////////////////
  function handleChange(id) {
    console.log(id);
    setModify(false);
  }
  ////////////////////////////////////////////////////////////////////////////////////
  function handlePcBureau() {
    if (selectedData.pc_bureau == "oui") {
      setPcBureau(false);
      selectedData.pc_bureau = "non";
    } else {
      setPcBureau(true);
      selectedData.pc_bureau = "oui";
    }
  }
  /////////////////////////////////////////////////////////////////////////////////
  function initializeCheckbox() {
    if (selectedData.pc_bureau == "oui") {
      setPcBureau(true);
      console.log("pc bureau : ", pcBureau);
    } else {
      setPcBureau(false);
    }
  }
  /////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    initializeCheckbox();
    let handler = (e) => {
      if (
        !ref1.current?.contains(e.target) &&
        !ref2.current?.contains(e.target)
      ) {
        setShowInfos(false);
        setModify(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  //////////////////////////////////////////////////////////////////////////////////////

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="backdrop relative"
      >
        {confirm && <Confirmation />}

        <div
          ref={ref1}
          className="action-bar absolute bg-white py-6 px-4 top-1/4 right-0 flex flex-col gap-6"
        >
          <motion.button whileTap={{ y: 4 }} whileHover={{ scale: 1.2 }}>
            <Image className="w-[25px]" alt="télécharger" src={download_icon} />
          </motion.button>
          <motion.button
            whileTap={{ y: 4 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setModify(true)}
          >
            <Image className="w-[25px]" alt="modifier" src={modify_icon} />
          </motion.button>
          <motion.button
            whileTap={{ y: 4 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => handleDelete(selectedData.id)}
          >
            <Image className="w-[25px]" alt="supprimer" src={delete_icon} />
          </motion.button>
        </div>
        <div
          ref={ref2}
          className="bg-white relative px-12 py-6 rounded-xl scale-50 lg:scale-75 xl:scale-90 w-[1250px] h-[1100px] lg:ml-[12%] lg:mt-[-7%] xl:ml-[16%] xl:mt-[3%]"
        >
          <motion.div
            whileTap={{ y: 5 }}
            onClick={handleChange}
            className={`save-btn absolute bottom-6 right-6 flex flex-row gap-2 items-center hover:cursor-pointer ${
              modify ? "flex" : "hidden"
            }`}
          >
            <p className="font-semibold">Enregistrer</p>
            <Image src={save_icon} alt="enregistrer" className="w-[25px]" />
          </motion.div>

          <p className="font-semibold text-center mb-9">
            Situation Parc Informatique
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-3 items-center">
              <p className="font-semibold">Nom : </p>
              {!modify && <p>{selectedData.nom}</p>}
              {modify && (
                <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                  <input
                    type="text"
                    defaultValue={selectedData.nom}
                    onClick={(e) => (selectedData.nom = e.target.value)}
                    className="textbox rounded-[10px] py-1 px-2 font-medium"
                  />
                </label>
              )}
            </div>
            <div className="flex flex-row gap-3 items-center">
              <p className="font-semibold">Prénom : </p>
              {!modify && <p>{selectedData.prenom}</p>}
              {modify && (
                <label className="rounded-[40px] flex flex-col text-[15px] w-[127px]">
                  <input
                    type="text"
                    defaultValue={selectedData.prenom}
                    onClick={(e) => (selectedData.prenom = e.target.value)}
                    className="textbox rounded-[10px] py-1 px-2 font-medium"
                  />
                </label>
              )}
            </div>
            <div className="flex flex-row gap-3 items-center">
              <p className="font-semibold">Service / Centre : </p>
              {!modify && <p>{selectedData.service}</p>}
              {modify && (
                <label className="rounded-[40px] flex flex-col text-[15px] w-[127px]">
                  <select
                    defaultValue={selectedData.service}
                    onClick={(e) => (selectedData.service = e.target.value)}
                    className="textbox rounded-[10px] py-1 px-2 font-medium"
                  >
                    {services.map((service) => (
                      <option className="text-[12px]" value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
            <p className="font-semibold">Equipement Informatique :</p>
            <div className="flex flex-col gap-6 ml-9">
              {/*-----------------PC Bureau----------------------*/}
              <div>
                <div className="flex flex-row gap-2">
                  <div className={`${modify ? "hidden" : "flex"}`}>
                    {selectedData.pc_bureau == "non" && (
                      <Image alt="frame" src={false_icon} />
                    )}
                    {selectedData.pc_bureau == "oui" && (
                      <Image alt="frame" src={true_icon} />
                    )}
                  </div>
                  <button
                    className={`${modify ? "visible" : "invisible"}`}
                    onClick={() => handlePcBureau()}
                  >
                    <Checkbox boxchecked={pcBureau} />
                  </button>

                  <p className="font-semibold">Pc Bureau</p>
                </div>
                {pcBureau && (
                  <div className="flex flex-row gap-6 ml-9">
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Marque</p>
                      {!modify && (
                        <div className="py-2 w-[90px] bg-light-blue">
                          <p>{selectedData.pc_bureau_marque}</p>
                        </div>
                      )}

                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[127px]">
                          <select
                            defaultValue={selectedData.pc_bureau_marque}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          >
                            {pcMarques.map((pcMarque) => (
                              <option className="text-[12px]" value={pcMarque}>
                                {pcMarque}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Model</p>
                      {!modify && (
                        <div className="py-2 w-[100px] bg-light-blue">
                          <p>{selectedData.pc_bureau_model}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[100px]">
                          <input
                            type="text"
                            defaultValue={selectedData.pc_bureau_model}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>NS</p>
                      {!modify && (
                        <div className="py-2 w-[150px] bg-light-blue">
                          <p>{selectedData.pc_bureau_ns}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                          <input
                            type="text"
                            defaultValue={selectedData.pc_bureau_ns}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Immo</p>
                      {!modify && (
                        <div className="py-2 w-[150px] bg-light-blue">
                          <p>{selectedData.pc_bureau_immo}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                          <input
                            type="text"
                            defaultValue={selectedData.pc_bureau_immo}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>SE</p>
                      {!modify && (
                        <div className="py-2 w-[90px] bg-light-blue">
                          <p>{selectedData.pc_bureau_se}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[90px]">
                          <input
                            type="text"
                            defaultValue={selectedData.pc_bureau_se}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>RAM</p>
                      {!modify && (
                        <div className="py-2 w-[90px] bg-light-blue">
                          <p>{selectedData.pc_bureau_ram}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[90px]">
                          <input
                            type="text"
                            defaultValue={selectedData.pc_bureau_ram}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Etat</p>
                      {!modify && (
                        <div className="py-2 w-[140px] bg-light-blue">
                          <p>{selectedData.pc_bureau_etat}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[140px]">
                          <select
                            defaultValue={selectedData.pc_bureau_etat}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          >
                            <option className="text-[12px]" value="bon">
                              Bon
                            </option>
                            <option className="text-[12px]" value="moyen">
                              Moyen
                            </option>
                            <option
                              className="text-[12px]"
                              value="hors service"
                            >
                              Hors service
                            </option>
                          </select>
                        </label>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/*------------------------------------------------*/}
              {/*-----------------PC Portable----------------------*/}
              <div>
                <div className="flex flex-row gap-2">
                  <div className={`${modify ? "hidden" : "flex"}`}>
                    {selectedData.pc_portable == "non" && (
                      <Image alt="frame" src={false_icon} />
                    )}
                    {selectedData.pc_portable == "oui" && (
                      <Image alt="frame" src={true_icon} />
                    )}
                  </div>
                  <input
                    className={`${modify ? "visible" : "invisible"}`}
                    type="checkbox"
                  />
                  <p className="font-semibold">Pc Portable</p>
                </div>
                {selectedData.pc_portable == "oui" && (
                  <div className="flex flex-row gap-6 ml-9">
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Marque</p>
                      {!modify && (
                        <div className="py-2 w-[90px] bg-light-blue">
                          <p>{selectedData.pc_portable_marque}</p>
                        </div>
                      )}

                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[127px]">
                          <select
                            defaultValue={selectedData.pc_portable_marque}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          >
                            {pcMarques.map((pcMarque) => (
                              <option className="text-[12px]" value={pcMarque}>
                                {pcMarque}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Model</p>
                      {!modify && (
                        <div className="py-2 w-[100px] bg-light-blue">
                          <p>{selectedData.pc_portable_model}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[100px]">
                          <input
                            type="text"
                            defaultValue={selectedData.pc_portable_model}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>NS</p>
                      {!modify && (
                        <div className="py-2 w-[150px] bg-light-blue">
                          <p>{selectedData.pc_portable_ns}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                          <input
                            type="text"
                            defaultValue={selectedData.pc_portable_ns}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Immo</p>
                      {!modify && (
                        <div className="py-2 w-[150px] bg-light-blue">
                          <p>{selectedData.pc_portable_immo}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                          <input
                            type="text"
                            defaultValue={selectedData.pc_portable_immo}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>SE</p>
                      {!modify && (
                        <div className="py-2 w-[90px] bg-light-blue">
                          <p>{selectedData.pc_portable_se}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[90px]">
                          <input
                            type="text"
                            defaultValue={selectedData.pc_portable_se}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>RAM</p>
                      {!modify && (
                        <div className="py-2 w-[90px] bg-light-blue">
                          <p>{selectedData.pc_portable_ram}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[90px]">
                          <input
                            type="text"
                            defaultValue={selectedData.pc_portable_ram}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Etat</p>
                      {!modify && (
                        <div className="py-2 w-[140px] bg-light-blue">
                          <p>{selectedData.pc_portable_etat}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[140px]">
                          <select
                            defaultValue={selectedData.pc_portable_etat}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          >
                            <option className="text-[12px]" value="bon">
                              Bon
                            </option>
                            <option className="text-[12px]" value="moyen">
                              Moyen
                            </option>
                            <option
                              className="text-[12px]"
                              value="hors service"
                            >
                              Hors service
                            </option>
                          </select>
                        </label>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/*------------------------------------------------*/}
              {/*--------------Imprimante Multifonctions-----------*/}
              <div>
                <div className="flex flex-row gap-2">
                  <div className={`${modify ? "hidden" : "flex"}`}>
                    {selectedData.imprimante_multifonctions == "non" && (
                      <Image alt="frame" src={false_icon} />
                    )}
                    {selectedData.imprimante_multifonctions == "oui" && (
                      <Image alt="frame" src={true_icon} />
                    )}
                  </div>
                  <input
                    className={`${modify ? "visible" : "invisible"}`}
                    type="checkbox"
                  />
                  <p className="font-semibold">Imprimante Multifonctions</p>
                </div>
                {selectedData.imprimante_multifonctions == "oui" && (
                  <div className="flex flex-row gap-6 ml-9">
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Marque</p>
                      {!modify && (
                        <div className="py-2 w-[90px] bg-light-blue">
                          <p>{selectedData.imprimante_multi_marque}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[127px]">
                          <select
                            defaultValue={selectedData.imprimante_multi_marque}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          >
                            {imprimanteMarques.map((imprimanteMarque) => (
                              <option
                                className="text-[12px]"
                                value={imprimanteMarque}
                              >
                                {imprimanteMarque}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Model</p>
                      {!modify && (
                        <div className="py-2 w-[100px] bg-light-blue">
                          <p>{selectedData.imprimante_multi_model}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[100px]">
                          <input
                            type="text"
                            defaultValue={selectedData.imprimante_multi_model}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>NS</p>
                      {!modify && (
                        <div className="py-2 w-[150px] bg-light-blue">
                          <p>{selectedData.imprimante_multi_ns}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                          <input
                            type="text"
                            defaultValue={selectedData.imprimante_multi_ns}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Immo</p>
                      {!modify && (
                        <div className="py-2 w-[150px] bg-light-blue">
                          <p>{selectedData.imprimante_multi_immo}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                          <input
                            type="text"
                            defaultValue={selectedData.imprimante_multi_immo}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Type Config</p>
                      {!modify && (
                        <div className="py-2 w-[120px] bg-light-blue">
                          <p>{selectedData.imprimante_multi_type_config}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[140px]">
                          <select
                            defaultValue={
                              selectedData.imprimante_multi_type_config
                            }
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          >
                            <option className="text-[12px]" value="reseau">
                              Réseau
                            </option>
                            <option className="text-[12px]" value="usb">
                              USB
                            </option>
                          </select>
                        </label>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Adresse IP</p>
                      {!modify && (
                        <div className="py-2 w-[150px] bg-light-blue">
                          <p>{selectedData.imprimante_multi_adresse_ip}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                          <input
                            type="text"
                            defaultValue={
                              selectedData.imprimante_multi_adresse_ip
                            }
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Etat</p>
                      {!modify && (
                        <div className="py-2 w-[140px] bg-light-blue">
                          <p>{selectedData.imprimante_multi_etat}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[140px]">
                          <select
                            defaultValue={selectedData.imprimante_multi_etat}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          >
                            <option className="text-[12px]" value="bon">
                              Bon
                            </option>
                            <option className="text-[12px]" value="moyen">
                              Moyen
                            </option>
                            <option
                              className="text-[12px]"
                              value="hors service"
                            >
                              Hors service
                            </option>
                          </select>
                        </label>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/*------------------------------------------------*/}
              {/*--------------Imprimante simple-----------*/}
              <div>
                <div className="flex flex-row gap-2">
                  <div className={`${modify ? "hidden" : "flex"}`}>
                    {selectedData.imprimante_simple == "non" && (
                      <Image alt="frame" src={false_icon} />
                    )}
                    {selectedData.imprimante_simple == "oui" && (
                      <Image alt="frame" src={true_icon} />
                    )}
                  </div>
                  <input
                    className={`${modify ? "visible" : "invisible"}`}
                    type="checkbox"
                  />
                  <p className="font-semibold">Imprimante Simple</p>
                </div>
                {selectedData.imprimante_simple == "oui" && (
                  <div className="flex flex-row gap-6 ml-9">
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Marque</p>
                      {!modify && (
                        <div className="py-2 w-[90px] bg-light-blue">
                          <p>{selectedData.imprimante_simple_marque}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[127px]">
                          <select
                            defaultValue={selectedData.imprimante_simple_marque}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          >
                            {imprimanteMarques.map((imprimanteMarque) => (
                              <option
                                className="text-[12px]"
                                value={imprimanteMarque}
                              >
                                {imprimanteMarque}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Model</p>
                      {!modify && (
                        <div className="py-2 w-[100px] bg-light-blue">
                          <p>{selectedData.imprimante_simple_model}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[100px]">
                          <input
                            type="text"
                            defaultValue={selectedData.imprimante_simple_model}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>NS</p>
                      {!modify && (
                        <div className="py-2 w-[150px] bg-light-blue">
                          <p>{selectedData.imprimante_simple_ns}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                          <input
                            type="text"
                            defaultValue={selectedData.imprimante_simple_ns}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Immo</p>
                      {!modify && (
                        <div className="py-2 w-[150px] bg-light-blue">
                          <p>{selectedData.imprimante_simple_immo}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                          <input
                            type="text"
                            defaultValue={selectedData.imprimante_simple_immo}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Type Config</p>
                      {!modify && (
                        <div className="py-2 w-[120px] bg-light-blue">
                          <p>{selectedData.imprimante_simple_type_config}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[140px]">
                          <select
                            defaultValue={
                              selectedData.imprimante_simple_type_config
                            }
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          >
                            <option className="text-[12px]" value="reseau">
                              Réseau
                            </option>
                            <option className="text-[12px]" value="usb">
                              USB
                            </option>
                          </select>
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Adresse IP</p>
                      {!modify && (
                        <div className="py-2 w-[150px] bg-light-blue rounded-lg">
                          <p>{selectedData.imprimante_simple_adresse_ip}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                          <input
                            type="text"
                            defaultValue={
                              selectedData.imprimante_simple_adresse_ip
                            }
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Etat</p>
                      {!modify && (
                        <div className="py-2 w-[140px] bg-light-blue">
                          <p>{selectedData.imprimante_simple_etat}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[140px]">
                          <select
                            defaultValue={selectedData.imprimante_simple_etat}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          >
                            <option className="text-[12px]" value="bon">
                              Bon
                            </option>
                            <option className="text-[12px]" value="moyen">
                              Moyen
                            </option>
                            <option
                              className="text-[12px]"
                              value="hors service"
                            >
                              Hors service
                            </option>
                          </select>
                        </label>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/*------------------------------------------------*/}
              {/*--------------Imprimante Thermique-----------*/}
              <div>
                <div className="flex flex-row gap-2">
                  <div className={`${modify ? "hidden" : "flex"}`}>
                    {selectedData.imprimante_thermique == "non" && (
                      <Image alt="frame" src={false_icon} />
                    )}
                    {selectedData.imprimante_thermique == "oui" && (
                      <Image alt="frame" src={true_icon} />
                    )}
                  </div>
                  <input
                    className={`${modify ? "visible" : "invisible"}`}
                    type="checkbox"
                  />
                  <p className="font-semibold">Imprimante Thermique</p>
                </div>
                {selectedData.imprimante_thermique == "oui" && (
                  <div className="flex flex-row gap-6 ml-9">
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Marque</p>
                      {!modify && (
                        <div className="py-2 w-[90px] bg-light-blue">
                          <p>{selectedData.imprimante_thermique_marque}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[127px]">
                          <select
                            defaultValue={
                              selectedData.imprimante_thermique_marque
                            }
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          >
                            {imprimanteMarques.map((imprimanteMarque) => (
                              <option
                                className="text-[12px]"
                                value={imprimanteMarque}
                              >
                                {imprimanteMarque}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Model</p>
                      {!modify && (
                        <div className="py-2 w-[100px] bg-light-blue">
                          <p>{selectedData.imprimante_thermique_model}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[100px]">
                          <input
                            type="text"
                            defaultValue={
                              selectedData.imprimante_thermique_model
                            }
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>NS</p>
                      {!modify && (
                        <div className="py-2 w-[150px] bg-light-blue">
                          <p>{selectedData.imprimante_thermique_ns}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                          <input
                            type="text"
                            defaultValue={selectedData.imprimante_thermique_ns}
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Immo</p>
                      {!modify && (
                        <div className="py-2 w-[150px] bg-light-blue">
                          <p>{selectedData.imprimante_thermique_immo}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                          <input
                            type="text"
                            defaultValue={
                              selectedData.imprimante_thermique_immo
                            }
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Type Config</p>
                      {!modify && (
                        <div className="py-2 w-[120px] bg-light-blue">
                          <p>{selectedData.imprimante_thermique_type_config}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[140px]">
                          <select
                            defaultValue={
                              selectedData.imprimante_thermique_type_config
                            }
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          >
                            <option className="text-[12px]" value="reseau">
                              Réseau
                            </option>
                            <option className="text-[12px]" value="usb">
                              USB
                            </option>
                          </select>
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Adresse IP</p>
                      {!modify && (
                        <div className="py-2 w-[150px] bg-light-blue rounded-lg">
                          <p>{selectedData.imprimante_thermique_adresse_ip}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                          <input
                            type="text"
                            defaultValue={
                              selectedData.imprimante_thermique_adresse_ip
                            }
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p>Etat</p>
                      {!modify && (
                        <div className="py-2 w-[140px] bg-light-blue">
                          <p>{selectedData.imprimante_thermique_etat}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[140px]">
                          <select
                            defaultValue={
                              selectedData.imprimante_thermique_etat
                            }
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          >
                            <option className="text-[12px]" value="bon">
                              Bon
                            </option>
                            <option className="text-[12px]" value="moyen">
                              Moyen
                            </option>
                            <option
                              className="text-[12px]"
                              value="hors service"
                            >
                              Hors service
                            </option>
                          </select>
                        </label>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/*------------------------------------------------*/}

              {/*--------------Scanner-----------*/}
              <div>
                <div className="flex flex-row gap-2">
                  <div className={`${modify ? "hidden" : "flex"}`}>
                    {selectedData.scanner == "non" && (
                      <Image alt="frame" src={false_icon} />
                    )}
                    {selectedData.scanner == "oui" && (
                      <Image alt="frame" src={true_icon} />
                    )}
                  </div>
                  <input
                    className={`${modify ? "visible" : "invisible"}`}
                    type="checkbox"
                  />
                  <p className="font-semibold">Scanner</p>
                </div>
              </div>
              {/*------------------------------------------------*/}
            </div>
            <p className="font-semibold mt-3">Réseau :</p>
            <div className="flex gap-1 items-center text-center ml-9">
              <p>Adresse IP</p>
              {!modify && (
                <div className="py-2 w-[150px] bg-light-blue">
                  <p>{selectedData.adresse_ip}</p>
                </div>
              )}
              {modify && (
                <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                  <input
                    type="text"
                    defaultValue={selectedData.adresse_ip}
                    className="textbox rounded-[7px] py-1 pl-3 font-medium"
                  />
                </label>
              )}
            </div>
            <div className="flex flex-row">
              <div className="flex flex-row gap-2 items-center">
                <div className={`${modify ? "hidden" : "flex"}`}>
                  {selectedData.securisation == "non" && (
                    <Image alt="frame" className="h-[25px]" src={false_icon} />
                  )}
                  {selectedData.securisation == "oui" && (
                    <Image alt="frame" className="h-[25px]" src={true_icon} />
                  )}
                </div>

                <p className="font-semibold">Sécurisation kaspersky</p>
                <input
                  className={`${modify ? "visible" : "invisible"}`}
                  type="checkbox"
                />
              </div>
              <div className="flex flex-col gap-3 ml-auto">
                <div className="flex flex-row gap-3">
                  <div className="flex flex-row gap-1 items-center">
                    <p className="font-semibold">Ajouté par : </p>
                    <p>{selectedData.ajouté_par}</p>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <p className="font-semibold">Le : </p>
                    <p>{selectedData.date_ajout}</p>
                  </div>
                </div>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-row gap-1 items-center">
                    <p className="font-semibold">Modifier par : </p>
                    <p>{selectedData.modifié_par}</p>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <p className="font-semibold">Le : </p>
                    <p>{selectedData.date_modif}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Infos;
