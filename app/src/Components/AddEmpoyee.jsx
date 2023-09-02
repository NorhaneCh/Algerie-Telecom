"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { imprimenteMarques, pcMarques, services } from "../Constants";
import { useSession } from "next-auth/react";

const PersonalInfos = ({ setShowCurrent, setShowNext, employee }) => {
  function handleShow() {
    setShowCurrent(false);
    setShowNext(true);
  }
  return (
    <motion.div
      initial={{ x: 600, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      exit={{ x: -600 }}
      transition={{
        type: "spring",
        mass: 0.4,
        damping: 8,
        when: "beforeChildren",
      }}
      className="flex flex-col p-6 items-center gap-9 h-full"
    >
      <p
        className="absolute bottom-6 right-9 hover:cursor-pointer font-semibold hover:text-black text-primary"
        onClick={handleShow}
      >
        suivant
      </p>
      <p className="text-[24px] font-medium">Renseignements Personnels</p>
      <label className="rounded-[40px] flex flex-col text-[15px] w-[250px]">
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          onChange={(e) => (employee.nom = e.target.value)}
          className="textbox rounded-[10px] py-2 px-3 font-medium"
        />
      </label>
      <label className="rounded-[40px] flex flex-col text-[15px] w-[250px]">
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          onChange={(e) => (employee.prenom = e.target.value)}
          className="textbox rounded-[10px] py-2 px-3 font-medium"
        />
      </label>
      <label className="rounded-[40px] flex flex-col gap-2 text-[15px] w-[250px]">
        <p className="ml-2 text-[15px] font-medium">
          Sélectionner le service :
        </p>

        <select
          className="textbox rounded-[10px] py-2 px-3 font-medium"
          onChange={(e) => (employee.service = e.target.value)}
          name="service"
        >
          {services.map((service, i) => (
            <option key={i} className="text-[12px]" value={service}>
              {service}
            </option>
          ))}
        </select>
      </label>
    </motion.div>
  );
};

const ParcInfos = ({ setShowCurrent, setShowNext, employee }) => {
  const [pcBureau, setPcBureau] = useState(false);
  const [pcPortable, setPcPortable] = useState(false);
  const [imprMulti, setImprMulti] = useState(false);
  const [imprSimple, setImprSimple] = useState(false);
  const [imprTh, setImprTh] = useState(false);
  const [scanner, setScanner] = useState(false);

  function handleSuiv() {
    if (pcBureau) employee.pc_bureau = "oui";
    else {
      employee.pc_bureau = "non";
      employee.pc_bureau_marque = "";
      employee.pc_bureau_model = "";
      employee.pc_bureau_ns = "";
      employee.pc_bureau_immo = "";
      employee.pc_bureau_se = "";
      employee.pc_bureau_ram = "";
      employee.pc_bureau_etat = "";
    }
    if (pcPortable) employee.pc_portable = "oui";
    else {
      employee.pc_portable = "non";
      employee.pc_portable_marque = "";
      employee.pc_portable_model = "";
      employee.pc_portable_ns = "";
      employee.pc_portable_immo = "";
      employee.pc_portable_se = "";
      employee.pc_portable_ram = "";
      employee.pc_portable_etat = "";
    }
    if (imprMulti) employee.imprimante_multifonctions = "oui";
    else {
      employee.imprimante_multifonctions = "non";
      employee.imprimante_multi_marque = "";
      employee.imprimante_multi_model = "";
      employee.imprimante_multi_ns = "";
      employee.imprimante_multi_immo = "";
      employee.imprimante_multi_type_config = "";
      employee.imprimante_multi_adresse_ip = "";
      employee.imprimante_multi_etat = "";
    }
    if (imprSimple) employee.imprimante_simple = "oui";
    else {
      employee.imprimante_simple = "non";
      employee.imprimante_simple_marque = "";
      employee.imprimante_simple_model = "";
      employee.imprimante_simple_ns = "";
      employee.imprimante_simple_immo = "";
      employee.imprimante_simple_type_config = "";
      employee.imprimante_simple_adresse_ip = "";
      employee.imprimante_simple_etat = "";
    }
    if (imprTh) employee.imprimante_thermique = "oui";
    else {
      employee.imprimante_thermique = "non";
      employee.imprimante_thermique_marque = "";
      employee.imprimante_thermique_model = "";
      employee.imprimante_thermique_ns = "";
      employee.imprimante_thermique_immo = "";
      employee.imprimante_thermique_type_config = "";
      employee.imprimante_thermique_adresse_ip = "";
      employee.imprimante_thermique_etat = "";
    }
    if (scanner) employee.scanner = "oui";
    else employee.scanner = "non";
    setShowCurrent(false);
    setShowNext(true);
  }
  return (
    <motion.div
      initial={{ x: 600, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      exit={{ x: -600, opacity: 0 }}
      transition={{
        type: "spring",
        mass: 0.4,
        damping: 8,
        when: "beforeChildren",
      }}
      className="relative flex flex-col p-6 gap-2 h-full"
    >
      <p
        className="absolute bottom-6 right-9 hover:cursor-pointer font-semibold hover:text-black text-primary"
        onClick={handleSuiv}
      >
        suivant
      </p>
      <p className="text-[24px] font-medium text-center">Parc Informatique</p>
      {/*---------------Pc Bureau---------------------*/}
      <div>
        <div className="flex flex-row gap-2">
          <input
            type="checkbox"
            id="pcBureau"
            onChange={() => setPcBureau(!pcBureau)}
          />
          <label for="pcBureau" className="text-[15px] font-semibold">
            Pc Bureau
          </label>
        </div>
        {pcBureau && (
          <div className="ml-4 flex flex-row gap-4">
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Marque</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[100px]">
                <select
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                  name="pc_bureau_marque"
                  onChange={(e) => (employee.pc_bureau_marque = e.target.value)}
                >
                  {pcMarques.map((pcMarque, index) => (
                    <option
                      key={index}
                      className="text-[12px]"
                      value={pcMarque}
                    >
                      {pcMarque}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Model</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <input
                  type="text"
                  name="pc_bureau_model"
                  onChange={(e) => (employee.pc_bureau_model = e.target.value)}
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">NS</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <input
                  type="text"
                  name="pc_bureau_ns"
                  onChange={(e) => (employee.pc_bureau_ns = e.target.value)}
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">IMMO</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <input
                  type="text"
                  name="pc_bureau_immo"
                  onChange={(e) => (employee.pc_bureau_immo = e.target.value)}
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">SE</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[100px]">
                <input
                  type="text"
                  name="pc_bureau_se"
                  onChange={(e) => (employee.pc_bureau_se = e.target.value)}
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">RAM</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[100px]">
                <input
                  type="text"
                  name="pc_bureau_ram"
                  onChange={(e) => (employee.pc_bureau_ram = e.target.value)}
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Etat</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <select
                  name="pc_bureau_etat"
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                  onChange={(e) => (employee.pc_bureau_etat = e.target.value)}
                >
                  <option className="text-[12px]" value="bon"></option>
                  <option className="text-[12px]" value="bon">
                    Bon
                  </option>
                  <option className="text-[12px]" value="moyen">
                    moyen
                  </option>
                  <option className="text-[12px]" value="hors service">
                    Hors service
                  </option>
                </select>
              </label>
            </div>
          </div>
        )}
      </div>
      {/*---------------Pc Portable---------------------*/}
      <div>
        <div className="flex flex-row gap-2">
          <input
            type="checkbox"
            id="pcPortable"
            onChange={() => setPcPortable(!pcPortable)}
          />
          <label for="pcPortable" className="text-[15px] font-semibold">
            Pc Portable
          </label>
        </div>
        {pcPortable && (
          <div className="ml-4 flex flex-row gap-4">
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Marque</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[100px]">
                <select
                  name="pc_portable_marque"
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                  onChange={(e) =>
                    (employee.pc_portable_marque = e.target.value)
                  }
                >
                  {pcMarques.map((pcMarque, index) => (
                    <option
                      key={index}
                      className="text-[12px]"
                      value={pcMarque}
                    >
                      {pcMarque}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Model</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <input
                  type="text"
                  name="pc_portable_model"
                  onChange={(e) =>
                    (employee.pc_portable_model = e.target.value)
                  }
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">NS</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <input
                  type="text"
                  name="pc_portable_ns"
                  onChange={(e) => (employee.pc_portable_ns = e.target.value)}
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">IMMO</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <input
                  type="text"
                  name="pc_portable_immo"
                  onChange={(e) => (employee.pc_portable_immo = e.target.value)}
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">SE</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[100px]">
                <input
                  type="text"
                  name="pc_portable_se"
                  onChange={(e) => (employee.pc_portable_se = e.target.value)}
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">RAM</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[100px]">
                <input
                  type="text"
                  name="pc_portable_ram"
                  onChange={(e) => (employee.pc_portable_ram = e.target.value)}
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Etat</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <select
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                  name="pc_portable_etat"
                  onChange={(e) => (employee.pc_portable_etat = e.target.value)}
                >
                  <option className="text-[12px]" value="bon"></option>
                  <option className="text-[12px]" value="bon">
                    Bon
                  </option>
                  <option className="text-[12px]" value="moyen">
                    moyen
                  </option>
                  <option className="text-[12px]" value="hors service">
                    Hors service
                  </option>
                </select>
              </label>
            </div>
          </div>
        )}
      </div>
      {/*---------------Imprimante Multifonctions---------------------*/}
      <div>
        <div className="flex flex-row gap-2">
          <input
            type="checkbox"
            id="imprMulti"
            onChange={() => setImprMulti(!imprMulti)}
          />
          <label for="imprMulti" className="text-[15px] font-semibold">
            Imprimante Multifonctions
          </label>
        </div>
        {imprMulti && (
          <div className="ml-4 flex flex-row gap-4">
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Marque</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[100px]">
                <select
                  name="imprimante_multi_marque"
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                  onChange={(e) =>
                    (employee.imprimante_multi_marque = e.target.value)
                  }
                >
                  {imprimenteMarques.map((imprimenteMarque, index) => (
                    <option
                      key={index}
                      className="text-[12px]"
                      value={imprimenteMarque}
                    >
                      {imprimenteMarque}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Model</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <input
                  type="text"
                  name="imprimante_multi_model"
                  onChange={(e) =>
                    (employee.imprimante_multi_model = e.target.value)
                  }
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">NS</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <input
                  type="text"
                  name="imprimante_multi_ns"
                  onChange={(e) =>
                    (employee.imprimante_multi_ns = e.target.value)
                  }
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">IMMO</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <input
                  type="text"
                  name="imprimante_multi_immo"
                  onChange={(e) =>
                    (employee.imprimante_multi_immo = e.target.value)
                  }
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Configuration</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[120px]">
                <select
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                  onChange={(e) =>
                    (employee.imprimante_multi_type_config = e.target.value)
                  }
                  name="imprimante_multi_type_config"
                >
                  <option className="text-[12px]" value=""></option>
                  <option className="text-[12px]" value="reseau">
                    Réseau
                  </option>
                  <option className="text-[12px]" value="usb">
                    USB
                  </option>
                </select>
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Adresse IP</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[120px]">
                <input
                  type="text"
                  name="imprimante_multi_adresse_ip"
                  onChange={(e) =>
                    (employee.imprimante_multi_adresse_ip = e.target.value)
                  }
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Etat</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <select
                  name="imprimante_multi_etat"
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                  onChange={(e) =>
                    (employee.imprimante_multi_etat = e.target.value)
                  }
                >
                  <option className="text-[12px]" value="bon"></option>
                  <option className="text-[12px]" value="bon">
                    Bon
                  </option>
                  <option className="text-[12px]" value="moyen">
                    moyen
                  </option>
                  <option className="text-[12px]" value="hors service">
                    Hors service
                  </option>
                </select>
              </label>
            </div>
          </div>
        )}
      </div>
      {/*---------------Imprimante Simple---------------------*/}
      <div>
        <div className="flex flex-row gap-2">
          <input
            type="checkbox"
            id="imprSimple"
            onChange={() => setImprSimple(!imprSimple)}
          />
          <label for="imprSimple" className="text-[15px] font-semibold">
            Imprimante Simple
          </label>
        </div>
        {imprSimple && (
          <div className="ml-4 flex flex-row gap-4">
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Marque</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[100px]">
                <select
                  name="imprimante_simple_marque"
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                  onChange={(e) =>
                    (employee.imprimante_simple_marque = e.target.value)
                  }
                >
                  {imprimenteMarques.map((imprimenteMarque, index) => (
                    <option
                      key={index}
                      className="text-[12px]"
                      value={imprimenteMarque}
                    >
                      {imprimenteMarque}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Model</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <input
                  type="text"
                  name="imprimante_simple_model"
                  onChange={(e) =>
                    (employee.imprimante_simple_model = e.target.value)
                  }
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">NS</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <input
                  type="text"
                  name="imprimante_simple_ns"
                  onChange={(e) =>
                    (employee.imprimante_simple_ns = e.target.value)
                  }
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">IMMO</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <input
                  type="text"
                  name="imprimante_simple_immo"
                  onChange={(e) =>
                    (employee.imprimante_simple_immo = e.target.value)
                  }
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Configuration</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[120px]">
                <select
                  name="imprimante_simple_type_config"
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                  onChange={(e) =>
                    (employee.imprimante_simple_type_config = e.target.value)
                  }
                >
                  <option className="text-[12px]" value=""></option>
                  <option className="text-[12px]" value="reseau">
                    Réseau
                  </option>
                  <option className="text-[12px]" value="usb">
                    USB
                  </option>
                </select>
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Adresse IP</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[120px]">
                <input
                  type="text"
                  name="imprimante_thermique_adresse_ip"
                  onChange={(e) =>
                    (employee.imprimante_simple_adresse_ip = e.target.value)
                  }
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Etat</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <select
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                  onChange={(e) =>
                    (employee.imprimante_simple_etat = e.target.value)
                  }
                  name="imprimante_simple_etat"
                >
                  <option className="text-[12px]" value="bon"></option>
                  <option className="text-[12px]" value="bon">
                    Bon
                  </option>
                  <option className="text-[12px]" value="moyen">
                    Moyen
                  </option>
                  <option className="text-[12px]" value="hors service">
                    Hors service
                  </option>
                </select>
              </label>
            </div>
          </div>
        )}
      </div>
      {/*---------------Imprimante Thermique---------------------*/}
      <div>
        <div className="flex flex-row gap-2">
          <input
            type="checkbox"
            id="imprTh"
            onChange={() => setImprTh(!imprTh)}
          />
          <label for="imprTh" className="text-[15px] font-semibold">
            Imprimante Thermique
          </label>
        </div>
        {imprTh && (
          <div className="ml-4 flex flex-row gap-4">
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Marque</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[100px]">
                <select
                  name="imprimante_thermique_marque"
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                  onChange={(e) =>
                    (employee.imprimante_thermique_marque = e.target.value)
                  }
                >
                  {imprimenteMarques.map((imprimenteMarque, index) => (
                    <option
                      key={index}
                      className="text-[12px]"
                      value={imprimenteMarque}
                    >
                      {imprimenteMarque}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Model</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <input
                  type="text"
                  onChange={(e) =>
                    (employee.imprimante_thermique_model = e.target.value)
                  }
                  name="imprimante_thermique_model"
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">NS</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <input
                  type="text"
                  onChange={(e) =>
                    (employee.imprimante_thermique_ns = e.target.value)
                  }
                  name="imprimante_thermique_ns"
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">IMMO</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <input
                  type="text"
                  onChange={(e) =>
                    (employee.imprimante_thermique_immo = e.target.value)
                  }
                  name="imprimante_thermique_immo"
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Configuration</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[120px]">
                <select
                  name="imprimante_thermique_type_config"
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                  onChange={(e) =>
                    (employee.imprimante_thermique_type_config = e.target.value)
                  }
                >
                  <option className="text-[12px]" value=""></option>
                  <option className="text-[12px]" value="reseau">
                    Réseau
                  </option>
                  <option className="text-[12px]" value="usb">
                    USB
                  </option>
                </select>
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Adresse IP</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[120px]">
                <input
                  type="text"
                  name="imprimante_thermique_adresse_ip"
                  onChange={(e) =>
                    (employee.imprimante_thermique_adresse_ip = e.target.value)
                  }
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Etat</p>
              <label className="rounded-[40px] flex flex-col text-[12px] w-[110px]">
                <select
                  name="imprimante_thermique_etat"
                  className="textbox rounded-[10px] py-1 pl-2 font-medium"
                  onChange={(e) =>
                    (employee.imprimante_thermique_etat = e.target.value)
                  }
                >
                  <option className="text-[12px]" value="bon"></option>
                  <option className="text-[12px]" value="bon">
                    Bon
                  </option>
                  <option className="text-[12px]" value="moyen">
                    Moyen
                  </option>
                  <option className="text-[12px]" value="hors service">
                    Hors service
                  </option>
                </select>
              </label>
            </div>
          </div>
        )}
      </div>
      {/*---------------Scanner---------------------*/}
      <div className="flex flex-row gap-2">
        <input
          type="checkbox"
          id="scanner"
          onChange={() => setScanner(!scanner)}
        />
        <label for="scanner" className="text-[15px] font-semibold">
          Scanner
        </label>
      </div>
    </motion.div>
  );
};

const ResSec = ({ setShowCurrent, setShowNext, employee, session }) => {
  const [secCheck, setSecCheck] = useState(false);
  //////////////////////////////////////////////////////////////////////////////////////
  const handleSubmit = async () => {
    if (secCheck) employee.securisation = "oui";
    else employee.securisation = "non"
    employee.ajouté_par = session.user.username;
    const currentDate = new Date();
    employee.date_ajout = currentDate.toISOString().split("T")[0];
    {
      fetch(
        "https://sheet.best/api/sheets/6ea63e6c-960d-41c9-8abd-9902a235fa74",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee),
        }
      )
        .then((r) => r.json())
        .then(() => {
          // The response comes here
          console.log(employee);
        })
        .then(() => setShowCurrent(false))
        .then(() => setShowNext(true))
        .catch((error) => {
          // Errors are reported there
          console.log(error);
        });
    }
  };

  //////////////////////////////////////////////////////////////////////////////////
  return (
    <motion.div
      initial={{ x: 600, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      exit={{ x: -600, opacity: 0 }}
      transition={{
        type: "spring",
        mass: 0.4,
        damping: 8,
        when: "beforeChildren",
      }}
      className="relative flex flex-col p-6 items-center gap-12 h-full"
    >
      <p
        className="absolute bottom-6 right-9 hover:cursor-pointer font-semibold hover:text-black text-primary"
        onClick={handleSubmit}
      >
        ajouter
      </p>
      <p className="text-[24px] font-medium">Réseau & Sécurisation</p>
      <label className="rounded-[40px] flex flex-col text-[15px] w-[250px] mt-9">
        <input
          type="text"
          name="adresse_ip"
          placeholder="Adresse IP"
          onChange={(e) => (employee.adresse_ip = e.target.value)}
          className="textbox rounded-[10px] py-2 px-3 font-medium"
        />
      </label>
      <div className="flex flex-row gap-6 -ml-6">
        <input
          type="checkbox"
          id="sec"
          onChange={() => setSecCheck(!secCheck)}
        />
        <label for="sec" className="text-[15px] font-semibold">
          Sécurisation kaspersky
        </label>
      </div>
    </motion.div>
  );
};

const Succès = ({ setShowAdd }) => {
  const pathVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setShowAdd(false);
    }, 2500);
  });
  return (
    <div>
      <div className="flex flex-col gap-6 items-center justify-center p-12 mt-[12%]">
        <motion.svg
          width="60"
          height="60"
          fill="none"
          stroke="#8fb3ff"
          stroke-linecap="round"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
          />
          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            d="M22 4 12 14.01l-3-3"
          />
        </motion.svg>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center"
        >
          <p className="text-[30px] font-semibold">Ajouté Avec</p>
          <p className="text-[30px] font-semibold">Succès</p>
        </motion.div>
      </div>
    </div>
  );
};

const AddEmpoyee = ({ showAdd, setShowAdd }) => {
  const { data: session } = useSession();
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
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  let ref = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!ref.current?.contains(e.target)) {
        setStep1(true);
        setStep2(false);
        setStep3(false);
        setStep4(false);
        setShowAdd(false);
        setEmployee({ ...employee, [e.target.name]: "" });
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  return (
    <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="backdrop relative"
        >
          <div ref={ref}>
            <div className=" scale-90 box absolute lg:top-24 xl:top-36 left-[20%] lg:w-[62%] xl:w-[50%] xl:left-[25%] h-[600px] rounded-xl overflow-hidden">
              {step1 && (
                <PersonalInfos
                  setShowCurrent={setStep1}
                  setShowNext={setStep2}
                  employee={employee}
                />
              )}
              {step2 && (
                <ParcInfos
                  setShowCurrent={setStep2}
                  setShowNext={setStep3}
                  employee={employee}
                />
              )}
              {step3 && (
                <ResSec
                  setShowCurrent={setStep3}
                  setShowNext={setStep4}
                  session={session}
                  employee={employee}
                />
              )}

              {step4 && (
                <Succès setShowCurrent={setStep4} setShowAdd={setShowAdd} />
              )}
            </div>
          </div>
        </motion.div>
    </AnimatePresence>
  );
};
export default AddEmpoyee;
