"use client";
import Image from "next/image";
import { styles } from "../../styles";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  add_frame,
  delete_icon_white,
  settings,
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
  const [showModel, setShowModel] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [toggle, setToggle] = useState(false);
  const { data: session } = useSession();

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
  useEffect(() => {
    fetchUsers();

    let handler = (e) => {
      if (!ref.current?.contains(e.target)) {
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
        <div className={`${styles.paddingX} mt-9 relative`}>
          {showModel && (
            <Popup
              content={"mot de pass réinitialisé à '0000'"}
              forDelete={false}
            />
          )}
          {showDeleteModel && (
            <Popup content={"Utilisateur supprimé"} forDelete={true} />
          )}

          <div className="flex flex-row gap-2 items-center">
            <Image
              src={settings}
              className="w-[30px] h-[30px]"
              alt={"settings"}
            ></Image>
            <p className="font-medium text-[25px]">Paramaitre</p>
          </div>
          <div className="flex flex-row w-[90%] ml-9 mt-9 items-start justify-center">
            <div className="flex flex-col gap-9">
              <div className="flex flex-row items-start gap-3">
                <p className="text-[17px] font-medium">Utilisateurs</p>
                <button className="-mt-1 p-1  rounded-[20px] h-9 bg-primary text-white hover:scale-110">
                  <Image
                    className="w-[25px] h-[25px]"
                    src={add_frame}
                    onClick={() => setToggle(true)}
                    alt="ajouter"
                  ></Image>
                </button>
              </div>
              {toggle && (
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="pt-9 pb-3 rounded-lg border-2 border-light-gray w-[400px] flex flex-col items-center justify-center gap-4"
                >
                  <label className="rounded-[40px] flex flex-col text-[15px] w-[80%] mx-auto">
                    <input
                      type="text"
                      placeholder="Nom"
                      onChange={(e) => (user.lastName = e.target.value)}
                      className="border-2 border-light-gray rounded-md py-1 pl-2 font-medium"
                    />
                  </label>
                  <label className="rounded-[40px] flex flex-col text-[15px] w-[80%] mx-auto">
                    <input
                      type="text"
                      placeholder="Prénom"
                      onChange={(e) => (user.firstName = e.target.value)}
                      className="border-2 border-light-gray rounded-md py-1 pl-2 font-medium"
                    />
                  </label>
                  <label>
                    <div className="flex flex-row gap-6 items-center">
                      <p>Sélectionner le role :</p>
                      <select
                        onChange={(e) => setUserRole(e.target.value)}
                        className="px-6 py-1 h-9 rounded-md border-2 border-light-gray"
                      >
                        <option value="lecteur" className="text-[15px]">
                          {" "}
                        </option>
                        <option value="admin" className="text-[15px]">
                          Admin
                        </option>
                        <option value="lecteur" className="text-[15px]">
                          Lecteur
                        </option>
                        <option className="text-[15px]" value="editeur">
                          Editeur
                        </option>
                      </select>
                    </div>
                  </label>
                  <button
                    className="py-1 px-3 rounded-md h-9 bg-gray-600 text-white hover:bg-gray-700 text-[15px] mt-[70px]"
                    onClick={() => handleSubmit(user)}
                  >
                    ajouter
                  </button>
                </motion.div>
              )}
            </div>
            <div className="ml-auto flex flex-col lg:h-[600px] xl:h-[1000px] overflow-auto px-9 py-4">
              {users.map((user, i) => (
                <div
                  key={`user-${i}`}
                  className="flex flex-row gap-9 border-b-2 border-light-gray h-16 items-center"
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
                    <p className="text-[12px] text-gray-500">{user.username}</p>
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
                      <option value="admin" className="text-[15px]">
                        Admin
                      </option>
                      <option value="lecteur" className="text-[15px]">
                        Lecteur
                      </option>
                      <option className="text-[15px]" value="editeur">
                        Editeur
                      </option>
                    </select>
                  </label>
                  <button
                    className="py-1 px-3 rounded-md h-9 bg-gray-600 text-white hover:bg-gray-700 text-[15px]"
                    onClick={() => handleUpdatePass(user.username)}
                  >
                    Réinitialiser
                  </button>
                  <button
                    className="py-1 px-2 rounded-md h-9 bg-red-500 text-white hover:bg-red-600 text-[15px]"
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
      className={`py-6 px-9  absolute lg:top-[-3%] xl:top-[-2%] xl:right-[45%] lg:right-[45%] rounded-xl w-[300px] ${
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
