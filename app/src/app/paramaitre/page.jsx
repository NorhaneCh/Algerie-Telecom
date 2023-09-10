"use client";
import Image from "next/image";
import { styles } from "../../styles";
import { use, useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Dropdown, Menu } from "antd";
import { add_frame, settings, user_icon } from "../../Assets";
import { motion } from "framer-motion";
import UserInfos from "../../Components/UserInfos";
import { Checkbox } from "../../Components/Checkbox";

const page = () => {
  const [user, setUser] = useState({
    username: "",
    password: "0000",
    firstName: "",
    lastName: "",
    isAdmin: false,
    canAdd: false,
    canDelete: false,
    canModify: false,
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
  const [showUserInfos, setShowUserInfos] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  /////////////////////////////////////////////////
  const [isAdmin, setIsAdmin] = useState(false);
  const [canAdd, setCanAdd] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canModify, setCanModify] = useState(false);
  ////////////////////////////////////////////////////////////////
  function handleAdmin() {
    if (user.isAdmin) {
      setIsAdmin(false);
      user.isAdmin = false;
    } else {
      setIsAdmin(true);
      user.isAdmin = true;
      setCanAdd(true);
      user.canAdd = true;
      setCanModify(true);
      user.canModify = true;
      setCanDelete(true);
      user.canDelete = true;
    }
  }
  ////////////////////////////////////////////////////////////////
  function handleAdd() {
    if (user.canAdd) {
      setCanAdd(false);
      user.canAdd = false;
      setIsAdmin(false);
      user.isAdmin = false;
    } else {
      setCanAdd(true);
      user.canAdd = true;
    }
  }
  ////////////////////////////////////////////////////////////////
  function handleModify() {
    if (user.canModify) {
      setCanModify(false);
      user.canModify = false;
      setIsAdmin(false);
      user.isAdmin = false;
    } else {
      setCanModify(true);
      user.canModify = true;
    }
  }
  ////////////////////////////////////////////////////////////////
  function handleDelete() {
    if (user.canDelete) {
      setCanDelete(false);
      user.canDelete = false;
      setIsAdmin(false);
      user.isAdmin = false;
    } else {
      setCanDelete(true);
      user.canDelete = true;
    }
  }
  ////////////////////////////////////////////////////////////////
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
  const handleInfos = (thisUser) => {
    setShowUserInfos(true);
    setSelectedUser(thisUser);
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
      addUser(user);
      //users.push(user);
      setToggle(false);
      reinisializeBox();
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
  const handleDeleteUser = async (username) => {
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
  const handleShowToggle = () => {
    setToggle(true);
    console.log("admin :", isAdmin);
    console.log("add :", canAdd);
    console.log("delete :", canDelete);
    console.log("modify :", canModify);
  };
  /////////////////////////////////////////////////////////////////////////////
  const handleServices = () => {
    setUsers_bg_color("");
    setShowUsers(false);
    setShowServices(true);
    setServices_bg_color("bg-primary");
  };
  /////////////////////////////////////////////////////////////////////////////
  const reinisializeBox = () => {
    setIsAdmin(false);
    user.isAdmin = false;
    setCanAdd(false);
    user.canAdd = false;
    setCanModify(false);
    user.canModify = false;
    setCanDelete(false);
    user.canDelete = false;
  };
  /////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    fetchUsers();

    let handler = (e) => {
      if (!ref.current?.contains(e.target)) {
        reinisializeBox();
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
          {showUserInfos ? (
            <UserInfos
              selectedUser={selectedUser}
              setShowUserInfos={setShowUserInfos}
            />
          ) : null}
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
            <div className="w-[20%] bg-light-blue h-[100%] fixed">
              <div className="flex flex-row gap-2 items-center mt-10 ml-16">
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
              className={`${styles.paddingX} ${styles.paddingY} w-[79%] ml-[20%]`}
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
                          onClick={() => handleShowToggle()}
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
                            <div className="flex flex-row gap-2 mt-3">
                              <button onClick={handleAdmin}>
                                <Checkbox boxchecked={isAdmin} />
                              </button>

                              <p>Administrateur</p>
                            </div>
                            <div className="flex flex-col gap-3 items-center mt-6">
                              <p className="fonts-medium">
                                Cocher les privilèges de cet utilisateur :
                              </p>
                              <div className="flex flex-col gap-4 mt-4">
                                <div className="flex flex-row gap-2">
                                  <button onClick={handleAdd}>
                                    <Checkbox boxchecked={canAdd} />
                                  </button>

                                  <p>Ajouter des employés</p>
                                </div>
                                <div className="flex flex-row gap-2">
                                  <button onClick={handleModify}>
                                    <Checkbox boxchecked={canModify} />
                                  </button>

                                  <p>Modifier des employés</p>
                                </div>
                                <div className="flex flex-row gap-2">
                                  <button onClick={handleDelete}>
                                    <Checkbox boxchecked={canDelete} />
                                  </button>

                                  <p>Supprimer des employés</p>
                                </div>
                              </div>
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
                        <Dropdown
                          overlay={
                            <div className="z-0 flex flex-col bg-gray-200 border boder-gray-500 rounded-md">
                              <div
                                className="hover:bg-gray-300 h-9 py-2 px-3 hover:cursor-pointer"
                                onClick={() => handleInfos(user)}
                              >
                                Modifier les privilèges
                              </div>
                              <div
                                className="hover:bg-gray-300 h-9 py-2 px-3 hover:cursor-pointer text-red-600"
                                onClick={() => handleDeleteUser(user.username)}
                              >
                                Supprimer
                              </div>
                            </div>
                          }
                          trigger={["contextMenu"]}
                        >
                          <div
                            key={`user-${i}`}
                            className="relative flex flex-row gap-9 border-b-2 border-light-gray h-[55px] items-center px-2 hover:bg-gray-100"
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
                                {user.isAdmin ? "Admin" : ""}
                              </p>
                            </div>
                            <button
                              className="py-1 px-3 rounded-md h-9 bg-gray-600 text-white hover:bg-black"
                              onClick={() => handleUpdatePass(user.username)}
                            >
                              Réinitialiser
                            </button>
                          </div>
                        </Dropdown>
                      ))}
                    </div>
                  </>
                )}
                {showServices ? <>Services</> : null}
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
      className={`py-4 px-6  absolute lg:top-[2%] xl:top-[2%] xl:right-[45%] lg:right-[40%] rounded-xl w-[300px] ${
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
