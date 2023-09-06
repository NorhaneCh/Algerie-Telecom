"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Checkbox } from "./Checkbox";
import { useSession } from "next-auth/react";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { algerie_telecom } from "../Assets";
import { pcMarques, services, imprimanteMarques } from "../Constants";
import {
  true_icon,
  false_icon,
  modify_icon,
  download_icon,
  save_icon,
  delete_icon,
} from "../Assets";

const Infos = ({
  setShowInfos,
  selectedData,
  setSelectedData,
  setData,
  data,
}) => {
  const [employee, setEmployee] = useState(Object.assign({}, selectedData));
  const [saveEmployee, setSaveEmployee] = useState(
    Object.assign({}, selectedData)
  );
  const { data: session } = useSession();

  const [modify, setModify] = useState(false);
  const [pcBureau, setPcBureau] = useState(false);
  const [pcPortable, setPcPortable] = useState(false);
  const [imprMulti, setImprMulti] = useState(false);
  const [imprSimple, setImprSimple] = useState(false);
  const [imprTh, setImprTh] = useState(false);
  const [scanner, setScanner] = useState(false);
  const [secCheck, setSecCheck] = useState(false);
  let ref1 = useRef();
  let ref2 = useRef();
  const [confirm, setConfirm] = useState(false);
  const Confirmation = () => {
    useEffect(() => {
      setTimeout(() => {
        setConfirm(false);
      }, 4000);
    }, []);
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
      .catch((error) => {
        console.error(error);
      });
  };
  /////////////////////////////////////////////////////////////////////////////////
  const handleChange = async (rowid) => {
    // const [id, ...employeeWithoutId] = employee;
    employee.modifié_par = session.user.username;
    const currentDate = new Date();
    employee.date_modif = currentDate.toISOString().split("T")[0];
    fetch(
      `https://sheet.best/api/sheets/6ea63e6c-960d-41c9-8abd-9902a235fa74/${
        rowid - 1
      }`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      }
    )
      .then((r) => r.json())
      .catch((error) => {
        console.error(error);
      });
    data[rowid - 1] = employee;
    console.log(data[rowid - 1]);
    setSelectedData(employee);
    setModify(false);
  };
  /////////////////////////////////////////////////////////////////////////////////
  function handleDecline() {
    setEmployee(Object.assign({}, saveEmployee));
    setModify(false);
  }
  ////////////////////////////////////////////////////////////////////////////////////
  function handlePcBureau() {
    if (employee.pc_bureau == "oui") {
      setPcBureau(false);
      employee.pc_bureau = "non";
      employee.pc_bureau_marque = "";
      employee.pc_bureau_model = "";
      employee.pc_bureau_ns = "";
      employee.pc_bureau_immo = "";
      employee.pc_bureau_se = "";
      employee.pc_bureau_ram = "";
      employee.pc_bureau_etat = "";
    } else {
      setPcBureau(true);
      employee.pc_bureau = "oui";
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  function handlePcPortable() {
    if (employee.pc_portable == "oui") {
      setPcPortable(false);
      employee.pc_portable = "non";
      employee.pc_portable_marque = "";
      employee.pc_portable_model = "";
      employee.pc_portable_ns = "";
      employee.pc_portable_immo = "";
      employee.pc_portable_se = "";
      employee.pc_portable_ram = "";
      employee.pc_portable_etat = "";
    } else {
      setPcPortable(true);
      employee.pc_portable = "oui";
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  function handleImprMulti() {
    if (employee.imprimante_multifonctions == "oui") {
      setImprMulti(false);
      employee.imprimante_multifonctions = "non";
      employee.imprimante_multi_marque = "";
      employee.imprimante_multi_model = "";
      employee.imprimante_multi_ns = "";
      employee.imprimante_multi_immo = "";
      employee.imprimante_multi_type_config = "";
      employee.imprimante_multi_adresse_ip = "";
      employee.imprimante_multi_etat = "";
    } else {
      setImprMulti(true);
      employee.imprimante_multifonctions = "oui";
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  function handleImprSimple() {
    if (employee.imprimante_simple == "oui") {
      setImprSimple(false);
      employee.imprimante_simple = "non";
      employee.imprimante_simple_marque = "";
      employee.imprimante_simple_model = "";
      employee.imprimante_simple_ns = "";
      employee.imprimante_simple_immo = "";
      employee.imprimante_simple_type_config = "";
      employee.imprimante_simple_adresse_ip = "";
      employee.imprimante_simple_etat = "";
    } else {
      setImprSimple(true);
      employee.imprimante_simple = "oui";
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  function handleImprTh() {
    if (employee.imprimante_thermique == "oui") {
      setImprTh(false);
      employee.imprimante_thermique = "non";
      employee.imprimante_thermique_marque = "";
      employee.imprimante_thermique_model = "";
      employee.imprimante_thermique_ns = "";
      employee.imprimante_thermique_immo = "";
      employee.imprimante_thermique_type_config = "";
      employee.imprimante_thermique_adresse_ip = "";
      employee.imprimante_thermique_etat = "";
    } else {
      setImprTh(true);
      employee.imprimante_thermique = "oui";
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  function handleScanner() {
    if (employee.scanner == "oui") {
      setScanner(false);
      employee.scanner = "non";
    } else {
      setScanner(true);
      employee.scanner = "oui";
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  function handleSec() {
    if (employee.securisation == "oui") {
      setSecCheck(false);
      employee.securisation = "non";
    } else {
      setSecCheck(true);
      employee.securisation = "oui";
    }
  }
  /////////////////////////////////////////////////////////////////////////////////
  function initializeCheckbox() {
    if (employee.pc_bureau == "oui") {
      setPcBureau(true);
    }
    if (employee.pc_portable == "oui") {
      setPcPortable(true);
    }
    if (employee.imprimante_multifonctions == "oui") {
      setImprMulti(true);
    }
    if (employee.imprimante_simple == "oui") {
      setImprSimple(true);
    }
    if (employee.imprimante_thermique == "oui") {
      setImprTh(true);
    }
    if (employee.scanner == "oui") {
      setScanner(true);
    }
    if (employee.securisation == "oui") {
      setSecCheck(true);
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
  });
  //////////////////////////////////////////////////////////////////////////////////////
  const downloadPDF = (nom, prenom) => {
    const capture = document.querySelector(".pdf-file");
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight() - 110;
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save(`${nom}-${prenom}-parc-informatique.pdf`);
    });
  };
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
            <Image
              className="w-[25px]"
              alt="télécharger"
              src={download_icon}
              onClick={() => downloadPDF(selectedData.nom, selectedData.prenom)}
            />
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
          className="pdf-file bg-white relative px-12 py-6 rounded-xl lg:scale-[70%] xl:scale-90 w-[1250px] h-[1070px] lg:ml-[10%] lg:mt-[-9%] xl:ml-[16%] xl:mt-[3%]"
        >
          <Image
            src={algerie_telecom}
            className="absolute top-3 right-5 w-[150px]"
          />
          <motion.button
            whileTap={{ y: 5 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => handleChange(selectedData.id)}
            className={`save-btn absolute bottom-6 right-6 flex flex-row gap-2 items-center ${
              modify ? "flex" : "hidden"
            }`}
          >
            <p className="font-semibold">Enregistrer</p>
            <Image src={save_icon} alt="enregistrer" className="w-[25px]" />
          </motion.button>
          <motion.button
            whileTap={{ y: 5 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleDecline}
            className={`decline-btn mx-auto font-semibold text-center absolute bottom-6 left-6 ${
              modify ? "flex" : "hidden"
            }`}
          >
            Annuler
          </motion.button>

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
                    defaultValue={employee.nom}
                    onChange={(e) => (employee.nom = e.target.value)}
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
                    defaultValue={employee.prenom}
                    onChange={(e) => (employee.prenom = e.target.value)}
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
                    defaultValue={employee.service}
                    onChange={(e) => (employee.service = e.target.value)}
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
                    {selectedData.pc_bureau == "non" &&
                      employee.pc_bureau == "non" && (
                        <Image alt="frame" src={false_icon} />
                      )}
                    {employee.pc_bureau == "oui" && (
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
                {employee.pc_bureau == "oui" && (
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
                            defaultValue={employee.pc_bureau_marque}
                            onChange={(e) =>
                              (employee.pc_bureau_marque = e.target.value)
                            }
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
                            defaultValue={employee.pc_bureau_model}
                            onChange={(e) =>
                              (employee.pc_bureau_model = e.target.value)
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
                          <p>{selectedData.pc_bureau_ns}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                          <input
                            type="text"
                            defaultValue={employee.pc_bureau_ns}
                            onChange={(e) =>
                              (employee.pc_bureau_ns = e.target.value)
                            }
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
                            defaultValue={employee.pc_bureau_immo}
                            onChange={(e) =>
                              (employee.pc_bureau_immo = e.target.value)
                            }
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
                            defaultValue={employee.pc_bureau_se}
                            onChange={(e) =>
                              (employee.pc_bureau_se = e.target.value)
                            }
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
                            defaultValue={employee.pc_bureau_ram}
                            onChange={(e) =>
                              (employee.pc_bureau_ram = e.target.value)
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
                          <p>{selectedData.pc_bureau_etat}</p>
                        </div>
                      )}
                      {modify && (
                        <label className="rounded-[40px] flex flex-col text-[15px] w-[140px]">
                          <select
                            defaultValue={employee.pc_bureau_etat}
                            onChange={(e) =>
                              (employee.pc_bureau_etat = e.target.value)
                            }
                            className="textbox rounded-[5px] py-1 px-2 font-medium"
                          >
                            <option className="text-[12px]"></option>
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
                  <button
                    className={`${modify ? "visible" : "invisible"}`}
                    onClick={() => handlePcPortable()}
                  >
                    <Checkbox boxchecked={pcPortable} />
                  </button>
                  <p className="font-semibold">Pc Portable</p>
                </div>
                {selectedData.pc_portable == "oui" &&
                  employee.pc_portable == "oui" && (
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
                              defaultValue={employee.pc_portable_marque}
                              onChange={(e) =>
                                (employee.pc_portable_marque = e.target.value)
                              }
                              className="textbox rounded-[5px] py-1 px-2 font-medium"
                            >
                              {pcMarques.map((pcMarque) => (
                                <option
                                  className="text-[12px]"
                                  value={pcMarque}
                                >
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
                              defaultValue={employee.pc_portable_model}
                              onChange={(e) =>
                                (employee.pc_portable_model = e.target.value)
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
                            <p>{selectedData.pc_portable_ns}</p>
                          </div>
                        )}
                        {modify && (
                          <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                            <input
                              type="text"
                              defaultValue={employee.pc_portable_ns}
                              onChange={(e) =>
                                (employee.pc_portable_ns = e.target.value)
                              }
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
                              defaultValue={employee.pc_portable_immo}
                              onChange={(e) =>
                                (employee.pc_portable_immo = e.target.value)
                              }
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
                              defaultValue={employee.pc_portable_se}
                              onChange={(e) =>
                                (employee.pc_portable_se = e.target.value)
                              }
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
                              defaultValue={employee.pc_portable_ram}
                              onChange={(e) =>
                                (employee.pc_portable_ram = e.target.value)
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
                            <p>{selectedData.pc_portable_etat}</p>
                          </div>
                        )}
                        {modify && (
                          <label className="rounded-[40px] flex flex-col text-[15px] w-[140px]">
                            <select
                              defaultValue={employee.pc_portable_etat}
                              onChange={(e) =>
                                (employee.pc_portable_etat = e.target.value)
                              }
                              className="textbox rounded-[5px] py-1 px-2 font-medium"
                            >
                              <option className="text-[12px]" value=""></option>
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
                  <button
                    className={`${modify ? "visible" : "invisible"}`}
                    onClick={() => handleImprMulti()}
                  >
                    <Checkbox boxchecked={imprMulti} />
                  </button>
                  <p className="font-semibold">Imprimante Multifonctions</p>
                </div>
                {selectedData.imprimante_multifonctions == "oui" &&
                  employee.imprimante_multifonctions == "oui" && (
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
                              defaultValue={employee.imprimante_multi_marque}
                              onChange={(e) =>
                                (employee.imprimante_multi_marque =
                                  e.target.value)
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
                            <p>{selectedData.imprimante_multi_model}</p>
                          </div>
                        )}
                        {modify && (
                          <label className="rounded-[40px] flex flex-col text-[15px] w-[100px]">
                            <input
                              type="text"
                              defaultValue={employee.imprimante_multi_model}
                              onChange={(e) =>
                                (employee.imprimante_multi_model =
                                  e.target.value)
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
                            <p>{selectedData.imprimante_multi_ns}</p>
                          </div>
                        )}
                        {modify && (
                          <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                            <input
                              type="text"
                              defaultValue={employee.imprimante_multi_ns}
                              onChange={(e) =>
                                (employee.imprimante_multi_ns = e.target.value)
                              }
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
                              defaultValue={employee.imprimante_multi_immo}
                              onChange={(e) =>
                                (employee.imprimante_multi_immo =
                                  e.target.value)
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
                            <p>{selectedData.imprimante_multi_type_config}</p>
                          </div>
                        )}
                        {modify && (
                          <label className="rounded-[40px] flex flex-col text-[15px] w-[140px]">
                            <select
                              defaultValue={
                                employee.imprimante_multi_type_config
                              }
                              onChange={(e) =>
                                (employee.imprimante_multi_type_config =
                                  e.target.value)
                              }
                              className="textbox rounded-[5px] py-1 px-2 font-medium"
                            >
                              <option className="text-[12px]"></option>
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
                                employee.imprimante_multi_adresse_ip
                              }
                              onChange={(e) =>
                                (employee.imprimante_multi_adresse_ip =
                                  e.target.value)
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
                              defaultValue={employee.imprimante_multi_etat}
                              onChange={(e) =>
                                (employee.imprimante_multi_etat =
                                  e.target.value)
                              }
                              className="textbox rounded-[5px] py-1 px-2 font-medium"
                            >
                              <option className="text-[12px]"></option>
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
                  <button
                    className={`${modify ? "visible" : "invisible"}`}
                    onClick={() => handleImprSimple()}
                  >
                    <Checkbox boxchecked={imprSimple} />
                  </button>
                  <p className="font-semibold">Imprimante Simple</p>
                </div>
                {selectedData.imprimante_simple == "oui" &&
                  employee.imprimante_simple == "oui" && (
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
                              defaultValue={employee.imprimante_simple_marque}
                              onChange={(e) =>
                                (employee.imprimante_simple_marque =
                                  e.target.value)
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
                            <p>{selectedData.imprimante_simple_model}</p>
                          </div>
                        )}
                        {modify && (
                          <label className="rounded-[40px] flex flex-col text-[15px] w-[100px]">
                            <input
                              type="text"
                              defaultValue={employee.imprimante_simple_model}
                              onChange={(e) =>
                                (employee.imprimante_simple_model =
                                  e.target.value)
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
                            <p>{selectedData.imprimante_simple_ns}</p>
                          </div>
                        )}
                        {modify && (
                          <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                            <input
                              type="text"
                              defaultValue={employee.imprimante_simple_ns}
                              onChange={(e) =>
                                (employee.imprimante_simple_ns = e.target.value)
                              }
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
                              defaultValue={employee.imprimante_simple_immo}
                              onChange={(e) =>
                                (employee.imprimante_simple_immo =
                                  e.target.value)
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
                            <p>{selectedData.imprimante_simple_type_config}</p>
                          </div>
                        )}
                        {modify && (
                          <label className="rounded-[40px] flex flex-col text-[15px] w-[140px]">
                            <select
                              defaultValue={
                                employee.imprimante_simple_type_config
                              }
                              onChange={(e) =>
                                (employee.imprimante_simple_type_config =
                                  e.target.value)
                              }
                              className="textbox rounded-[5px] py-1 px-2 font-medium"
                            >
                              <option className="text-[12px]"></option>
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
                                employee.imprimante_simple_adresse_ip
                              }
                              onChange={(e) =>
                                (employee.imprimante_simple_adresse_ip =
                                  e.target.value)
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
                              defaultValue={employee.imprimante_simple_etat}
                              onChange={(e) =>
                                (employee.imprimante_simple_etat =
                                  e.target.value)
                              }
                              className="textbox rounded-[5px] py-1 px-2 font-medium"
                            >
                              <option className="text-[12px]"></option>
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
                  <button
                    className={`${modify ? "visible" : "invisible"}`}
                    onClick={() => handleImprTh()}
                  >
                    <Checkbox boxchecked={imprTh} />
                  </button>
                  <p className="font-semibold">Imprimante Thermique</p>
                </div>
                {selectedData.imprimante_thermique == "oui" &&
                  employee.imprimante_thermique == "oui" && (
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
                                employee.imprimante_thermique_marque
                              }
                              onChange={(e) =>
                                (employee.imprimante_thermique_marque =
                                  e.target.value)
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
                              defaultValue={employee.imprimante_thermique_model}
                              onChange={(e) =>
                                (employee.imprimante_thermique_model =
                                  e.target.value)
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
                              defaultValue={employee.imprimante_thermique_ns}
                              onChange={(e) =>
                                (employee.imprimante_thermique_ns =
                                  e.target.value)
                              }
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
                              defaultValue={employee.imprimante_thermique_immo}
                              onChange={(e) =>
                                (employee.imprimante_thermique_immo =
                                  e.target.value)
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
                            <p>
                              {selectedData.imprimante_thermique_type_config}
                            </p>
                          </div>
                        )}
                        {modify && (
                          <label className="rounded-[40px] flex flex-col text-[15px] w-[140px]">
                            <select
                              defaultValue={
                                employee.imprimante_thermique_type_config
                              }
                              onChange={(e) =>
                                (employee.imprimante_thermique_type_config =
                                  e.target.value)
                              }
                              className="textbox rounded-[5px] py-1 px-2 font-medium"
                            >
                              <option className="text-[12px]"></option>
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
                            <p>
                              {selectedData.imprimante_thermique_adresse_ip}
                            </p>
                          </div>
                        )}
                        {modify && (
                          <label className="rounded-[40px] flex flex-col text-[15px] w-[150px]">
                            <input
                              type="text"
                              defaultValue={
                                employee.imprimante_thermique_adresse_ip
                              }
                              onChange={(e) =>
                                (employee.imprimante_thermique_adresse_ip =
                                  e.target.value)
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
                              defaultValue={employee.imprimante_thermique_etat}
                              onChange={(e) =>
                                (employee.imprimante_thermique_etat =
                                  e.target.value)
                              }
                              className="textbox rounded-[5px] py-1 px-2 font-medium"
                            >
                              <option className="text-[12px]"></option>
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
                  <button
                    className={`${modify ? "visible" : "invisible"}`}
                    onClick={() => handleScanner()}
                  >
                    <Checkbox boxchecked={scanner} />
                  </button>
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
                    defaultValue={employee.adresse_ip}
                    onChange={(e) => (employee.adresse_ip = e.target.value)}
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
                <button
                  className={`${modify ? "visible" : "invisible"}`}
                  onClick={() => handleSec()}
                >
                  <Checkbox boxchecked={secCheck} />
                </button>
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
                    <p className="font-semibold">Modifié par : </p>
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
