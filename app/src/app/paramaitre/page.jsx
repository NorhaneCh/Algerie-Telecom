"use client";
import Image from "next/image";
import { styles } from "../../styles";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  add_frame,
  delete_icon_white,
  settings,
  settings_black,
  user_icon,
} from "../../Assets";
import { motion } from "framer-motion";

const page = () => {
  const [user, setUser] = useState({
    username: "",
    password: "0000",
    firstName: "",
    lastName: "",
    isAdmin: false,
    canAdd: false,
    canDelete: false,
  });
  let ref = useRef();
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [toggle, setToggle] = useState(false);
  const { data: session } = useSession();
  const [users_bg_color, setUsers_bg_color] = useState("");
  const [services_bg_color, setServices_bg_color] = useState("");
  const [valideLastName, setValidLastName] = useState(true);
  const [valideFirstName, setValidFirstName] = useState(true);
  /////////////////////////////////////////////////
  const addUser = async (user) => {
    const data = await fetch("http://localhost:3000/api/users/createUser", {
      body: JSON.stringify(user),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  ///////////////////////////////////////////////////
  const handleSubmit = async (user) => {
    if (
      user.lastName == "" ||
      user.lastName == " " ||
      user.firstName == "" ||
      user.firstName == " "
    ) {
      if (user.lastName == "" || user.lastName == " ") {
        setValidLastName(false);
      }
      if (user.firstName == "" || user.firstName == " ") {
        setValidFirstName(false);
      }
    } else {
      user.username = user.lastName + "." + user.firstName;
      if (userRole == "admin") {
        user.isAdmin = true;
        user.canAdd = true;
        user.canDelete = true;
      }
      if (userRole == "editeur") {
        user.canAdd = true;
        user.canDelete = true;
      }
      addUser(user);
      //users.push(user);
      setToggle(false);
      setValidFirstName(true);
      setValidLastName(true);
    }
  };
  /////////////////////////////////////////////////
  const deleteUser = async (username) => {
    const deletedUser = await fetch("http://localhost:3000/api/users/delete", {
      body: JSON.stringify({ username }),
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  /////////////////////////////////////////////////////////
  const handleDelete = async (username) => {
    deleteUser(username);
    setShowDeleteModel(true);
    setTimeout(() => {
      setShowDeleteModel(false);
    }, 2700);
    //const deletedUser = username;
    //const updatedUsers = users.filter((user) => user.username !== deletedUser);
    //setUsers(updatedUsers);
  };
  ///////////////////////////////////////////////////////////
  const updatePass = async (username) => {
    const password = "0000";
    const firstLog = true;
    const updatedUser = await fetch(
      "http://localhost:3000/api/users/updatePass",
      {
        body: JSON.stringify({ username, password, firstLog }),
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  ///////////////////////////////////////////////////////////
  const handleUpdatePass = async (username) => {
    updatePass(username);
    setShowModel(true);
    setTimeout(() => {
      setShowModel(false);
    }, 2700);
  };
  ///////////////////////////////////////////////////////////
  const updateRole = async (username, canAdd, canDelete, isAdmin) => {
    const updatedUser = await fetch(
      "http://localhost:3000/api/users/updateRole",
      {
        body: JSON.stringify({ username, canAdd, canDelete, isAdmin }),
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  ///////////////////////////////////////////////////////////
  const handleUserRole = async (username, e) => {
    const value = e.target.value;
    let isAdmin = false;
    let canAdd = false;
    let canDelete = false;
    if (value == "admin") {
      isAdmin = true;
      canAdd = true;
      canDelete = true;
    }
    if (value == "editeur") {
      canAdd = true;
      canDelete = true;
    }
    updateRole(username, canAdd, canDelete, isAdmin);
  };
  //////////////////////////////////////////////////////////
  const fetchUsers = async () => {
    const data = await fetch("http://localhost:3000/api/users/getUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((value) => {
        setUsers(value);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  /////////////////////////////////////////////////////////////////////////////
  const handleUsers = () => {
    setServices_bg_color("");
    setShowServices(false);
    setShowUsers(true);
    setUsers_bg_color("bg-primary");
  };
  /////////////////////////////////////////////////////////////////////////////
  const handleServices = () => {
    setUsers_bg_color("");
    setShowUsers(false);
    setShowServices(true);
    setServices_bg_color("bg-primary");
  };
  /////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    fetchUsers();

    let handler = (e) => {
      if (!ref.current?.contains(e.target)) {
        setValidFirstName(true);
        setValidLastName(true);
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [handleSubmit, handleDelete]);
  return (
    <div>
      {session && session.user.isAdmin && (
        <div className="relative">
          <p></p>
          {showModel && (
            <Popup
              content={"mot de pass réinitialisé à '0000'"}
              forDelete={false}
            />
          )}
          {showDeleteModel && (
            <Popup content={"Utilisateur supprimé"} forDelete={true} />
          )}
          <div className="flex flex-row items-start">
            <div className="w-[20%] float-left bg-light-blue h-screen sticky top-0">
              <div className="flex flex-row gap-2 items-center mt-20 ml-16">
                <Image
                  src={settings}
                  className="w-[25px] h-[25px]"
                  alt={"settings"}
                ></Image>
                <p className="font-medium text-[20px]">Paramaitre</p>
              </div>
              <div className="mt-12">
                <div
                  className={`h-12 border-y border-white ${users_bg_color} py-3 pl-24 hover:cursor-pointer hover:bg-primary`}
                  onClick={() => handleUsers()}
                >
                  <p className="text-[15px] font-medium">Utilisateurs</p>
                </div>
                <div
                  className={`h-12 border-b border-white ${services_bg_color} py-3 pl-24 hover:cursor-pointer hover:bg-primary`}
                  onClick={() => handleServices()}
                >
                  <p className="text-[15px] font-medium">Services</p>
                </div>
                <div
                  className="h-12 border-b border-white py-3 pl-24 hover:cursor-pointer hover:bg-primary"
                  onClick={signOut}
                >
                  <p className="text-[15px] font-medium">Se déconnecter</p>
                </div>
              </div>
            </div>
            <div
              className={`${styles.paddingX} ${styles.paddingY} w-[79%] float-right`}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-row"
              >
                {showUsers && (
                  <>
                    <div>
                      <button className="-mt-1 p-1  rounded-[20px] h-9 bg-primary text-white hover:scale-110">
                        <Image
                          className="w-[25px] h-[25px]"
                          src={add_frame}
                          onClick={() => setToggle(true)}
                          alt="ajouter"
                        ></Image>
                      </button>
                      {toggle && (
                        <motion.div
                          ref={ref}
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          className={`pt-9 pb-3 mt-6 rounded-lg border-2 border-light-gray w-[400px] flex flex-col items-center justify-center gap-4 text-[14px]`}
                        >
                          <label className="flex flex-col w-[80%] mx-auto">
                            <input
                              type="text"
                              placeholder={
                                valideLastName ? "Nom" : "Entrez le nom !"
                              }
                              onChange={(e) => (user.lastName = e.target.value)}
                              className={`border-2 rounded-md py-1 pl-2 font-medium ${
                                valideLastName
                                  ? "border-light-gray"
                                  : "border-red-500 placeholder:text-red-500"
                              }`}
                            />
                          </label>
                          <label className="rounded-[40px] flex flex-col w-[80%] mx-auto">
                            <input
                              type="text"
                              placeholder={
                                valideFirstName
                                  ? "Prénom"
                                  : "Entrez le prénom !"
                              }
                              onChange={(e) =>
                                (user.firstName = e.target.value)
                              }
                              className={`border-2 rounded-md py-1 pl-2 font-medium ${
                                valideFirstName
                                  ? "border-light-gray"
                                  : "border-red-500 placeholder:text-red-500"
                              }`}
                            />
                          </label>
                          <label>
                            <div className="flex flex-row gap-6 items-center">
                              <p>Sélectionner le role :</p>
                              <select
                                onChange={(e) => setUserRole(e.target.value)}
                                className="px-6 py-1 h-9 rounded-md border-2 border-light-gray w-[155px]"
                              >
                                <option value="lecteur"> </option>
                                <option value="admin">Admin</option>
                                <option value="lecteur">Lecteur</option>
                                <option value="editeur">Editeur</option>
                              </select>
                            </div>
                          </label>
                          <button
                            className="py-1 px-3 rounded-md h-9 bg-gray-600 text-white hover:bg-gray-700 mt-9"
                            onClick={() => handleSubmit(user)}
                          >
                            ajouter
                          </button>
                        </motion.div>
                      )}
                    </div>
                    <div className="ml-auto flex flex-col lg:h-[600px] xl:h-[1000px] overflow-auto px-9 py-4 text-[15px]">
                      {users.map((user, i) => (
                        <div
                          key={`user-${i}`}
                          className="flex flex-row gap-9 border-b-2 border-light-gray h-[55px] items-center"
                        >
                          <Image
                            src={user_icon}
                            alt="user"
                            className="w-[40px]"
                          ></Image>
                          <div className="flex flex-col -ml-6">
                            <div className="flex flex-row gap-1 items-center w-[150px] ">
                              <p>{user.lastName}</p>
                              <p>{user.firstName}</p>
                            </div>
                            <p className="text-[11px] text-gray-500">
                              {user.username}
                            </p>
                          </div>
                          <label>
                            <select
                              className="px-6 py-1 h-9 rounded-md border-2 border-light-gray"
                              onChange={(e) => handleUserRole(user.username, e)}
                              defaultValue={
                                user.isAdmin
                                  ? "Admin"
                                  : user.canAdd && user.canDelete
                                  ? "editeur"
                                  : "lecteur"
                              }
                            >
                              <option value="admin">Admin</option>
                              <option value="lecteur">Lecteur</option>
                              <option value="editeur">Editeur</option>
                            </select>
                          </label>
                          <button
                            className="py-1 px-3 rounded-md h-9 bg-gray-600 text-white hover:bg-black"
                            onClick={() => handleUpdatePass(user.username)}
                          >
                            Réinitialiser
                          </button>
                          <button
                            className="py-1 px-2 rounded-md h-9 bg-red-500 text-white hover:bg-red-600"
                            onClick={() => handleDelete(user.username)}
                          >
                            <Image
                              className="w-[20px]"
                              src={delete_icon_white}
                              alt="supprimer"
                            ></Image>
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {showServices && <>Services</>}
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {session && !session.user.isAdmin && (
        <div className="text-center h-screen flex flex-col gap-9">
          <p className="mt-[15%] text-[20px] font-semibold">
            Seuls les administrateurs peuvent accéder à cette page !
          </p>
          <Link href="http://localhost:3000/home">
            <p className="text-primary hover:text-black font-medium">
              revenir à la page d'acceil
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;

const Popup = ({ content, forDelete }) => {
  const pathVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`py-4 px-6  absolute lg:top-[2%] xl:top-[2%] xl:right-[45%] lg:right-[45%] rounded-xl w-[300px] ${
        forDelete ? "bg-red-500" : "bg-gray-600"
      }`}
    >
      <div className="flex flex-col gap-4 items-center justify-center">
        <motion.svg
          width="30"
          height="30"
          fill="none"
          stroke="#ffffff"
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
          transition={{ delay: 1 }}
          className="text-center"
        >
          <p className="text-[15px] font-medium text-white">{content}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};
