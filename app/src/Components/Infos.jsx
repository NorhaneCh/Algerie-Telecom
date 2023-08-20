import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { true_icon, false_icon } from "../Assets";

const Infos = ({ showInfos, setShowInfos, selectedData, setSelectedData }) => {
  const [modify, setModify] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  let ref = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!ref.current?.contains(e.target)) {
        setShowInfos(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <AnimatePresence>
      {showInfos && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="backdrop"
        >
          <div
            ref={ref}
            className="bg-white mt-[-90px] w-[70%] mx-auto p-12 rounded-xl scale-75"
          >
            <p className="font-semibold text-center mb-9">
              Situation Parc Informatique
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-3 items-center">
                <p className="font-semibold">Nom : </p>
                {!modify && <p>{selectedData.nom}</p>}
              </div>
              <div className="flex flex-row gap-3 items-center">
                <p className="font-semibold">Prénom : </p>
                {!modify && <p>{selectedData.prenom}</p>}
              </div>
              <div className="flex flex-row gap-3 items-center">
                <p className="font-semibold">Service / Centre : </p>
                {!modify && <p>{selectedData.service}</p>}
              </div>
              <p className="font-semibold">Equipement Informatique :</p>
              <div className="flex flex-col gap-6 ml-9">
                {/*-----------------PC Bureau----------------------*/}
                <div className="mt-6">
                  <div className="flex flex-row">
                    <div className={`${modify ? "hidden" : "flex"}`}>
                      {selectedData.pc_bureau == "non" && (
                        <Image src={false_icon} />
                      )}
                      {selectedData.pc_bureau == "oui" && (
                        <Image src={true_icon} />
                      )}
                    </div>
                    <input
                      className={`${modify ? "visible" : "invisible"}`}
                      type="checkbox"
                    />
                    <p className="font-semibold">Pc Bureau</p>
                  </div>
                  {selectedData.pc_bureau == "oui" && (
                    <div className="flex flex-row gap-6 ml-9">
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Marque</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.pc_bureau_marque}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Model</p>
                        {!modify && (
                          <div className="py-2 w-[100px] bg-light-blue">
                            <p>{selectedData.pc_bureau_model}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>NS</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.pc_bureau_ns}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Immo</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.pc_bureau_immo}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>SE</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.pc_bureau_se}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>RAM</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.pc_bureau_ram}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Etat</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.pc_bureau_etat}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/*------------------------------------------------*/}
                {/*-----------------PC Portable----------------------*/}
                <div>
                  <div className="flex flex-row">
                    <div className={`${modify ? "hidden" : "flex"}`}>
                      {selectedData.pc_portable == "non" && (
                        <Image src={false_icon} />
                      )}
                      {selectedData.pc_portable == "oui" && (
                        <Image src={true_icon} />
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
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Model</p>
                        {!modify && (
                          <div className="py-2 w-[100px] bg-light-blue">
                            <p>{selectedData.pc_portable_model}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>NS</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.pc_portable_ns}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Immo</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.pc_portable_immo}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>SE</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.pc_portable_se}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>RAM</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.pc_portable_ram}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Etat</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.pc_portable_etat}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/*------------------------------------------------*/}
                {/*--------------Imprimente Multifonctions-----------*/}
                <div>
                  <div className="flex flex-row">
                    <div className={`${modify ? "hidden" : "flex"}`}>
                      {selectedData.imprimente_multifonctions == "non" && (
                        <Image src={false_icon} />
                      )}
                      {selectedData.imprimente_multifonctions == "oui" && (
                        <Image src={true_icon} />
                      )}
                    </div>
                    <input
                      className={`${modify ? "visible" : "invisible"}`}
                      type="checkbox"
                    />
                    <p className="font-semibold">Imprimente Multifonctions</p>
                  </div>
                  {selectedData.imprimente_multifonctions == "oui" && (
                    <div className="flex flex-row gap-6 ml-9">
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Marque</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.imprimente_multi_marque}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Model</p>
                        {!modify && (
                          <div className="py-2 w-[100px] bg-light-blue">
                            <p>{selectedData.imprimente_multi_model}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>NS</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.imprimente_multi_ns}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Immo</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.imprimente_multi_immo}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Type Config</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>
                              {selectedData.imprimente_multi_type_configuration}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Adresse IP</p>
                        {!modify && (
                          <div className="py-2 w-[150px] bg-light-blue">
                            <p>{selectedData.imprimente_multi_adresse_ip}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/*------------------------------------------------*/}
                {/*--------------Imprimente Thermique-----------*/}
                <div>
                  <div className="flex flex-row">
                    <div className={`${modify ? "hidden" : "flex"}`}>
                      {selectedData.imprimente_thermique == "non" && (
                        <Image src={false_icon} />
                      )}
                      {selectedData.imprimente_thermique == "oui" && (
                        <Image src={true_icon} />
                      )}
                    </div>
                    <input
                      className={`${modify ? "visible" : "invisible"}`}
                      type="checkbox"
                    />
                    <p className="font-semibold">Imprimente Thermique</p>
                  </div>
                  {selectedData.imprimente_thermique == "oui" && (
                    <div className="flex flex-row gap-6 ml-9">
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Marque</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.imprimente_thermique_marque}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Model</p>
                        {!modify && (
                          <div className="py-2 w-[100px] bg-light-blue">
                            <p>{selectedData.imprimente_thermique_model}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>NS</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.imprimente_thermique_ns}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Immo</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>{selectedData.imprimente_thermique_immo}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Type Config</p>
                        {!modify && (
                          <div className="py-2 w-[90px] bg-light-blue">
                            <p>
                              {
                                selectedData.imprimente_thermique_type_configuration
                              }
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <p>Adresse IP</p>
                        {!modify && (
                          <div className="py-2 w-[150px] bg-light-blue">
                            <p>
                              {selectedData.imprimente_thermique_adresse_ip}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/*------------------------------------------------*/}
                {/*--------------Scanner-----------*/}
                <div>
                  <div className="flex flex-row">
                    <div className={`${modify ? "hidden" : "flex"}`}>
                      {selectedData.scanner == "non" && (
                        <Image src={false_icon} />
                      )}
                      {selectedData.scanner == "oui" && (
                        <Image src={true_icon} />
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
              <p className="font-semibold mt-6">Réseau :</p>
              <div className="flex gap-1 items-center text-center ml-9">
                <p>Adresse IP</p>
                {!modify && (
                  <div className="py-2 w-[150px] bg-light-blue">
                    <p>{selectedData.adresse_ip}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-3 items-center mt-6">
                <p className="font-semibold">Securisation kaspersky : </p>
                {!modify && <p>{selectedData.securisation}</p>}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Infos;
