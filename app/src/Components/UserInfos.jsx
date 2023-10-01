import { AnimatePresence, motion } from "framer-motion";
import { useRef, useEffect, useState, use } from "react";
import { Checkbox } from "./Checkbox";

const UserInfos = ({ selectedUser, setShowUserInfos }) => {
  const [user, setUser] = useState(Object.assign({}, selectedUser));
  let ref1 = useRef();
  const [isAdmin, setIsAdmin] = useState(false);
  const [canAdd, setCanAdd] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canModify, setCanModify] = useState(false);
  const [modify, setModify] = useState(false);
  ////////////////////////////////////////////////////////////
  function initializeCheckbox() {
    if (user.isAdmin) {
      setIsAdmin(true);
      setCanAdd(true);
      setCanDelete(true);
      setCanModify(true);
    }
    if (user.canAdd) {
      setCanAdd(true);
    }
    if (user.canModify) {
      setCanModify(true);
    }
    if (user.canDelete) {
      setCanDelete(true);
    }
  }
  //////////////////////////////////////////////////////////////////
  const updateUser = async (user) => {
    let username = user.username;
    let canAdd = user.canAdd;
    let canModify = user.canModify;
    let canDelete = user.canDelete;
    let isAdmin = user.isAdmin;
    const updatedUser = await fetch(
      "http://localhost:3000/api/users/updateUser",
      {
        body: JSON.stringify({
          username,
          canAdd,
          canDelete,
          isAdmin,
          canModify,
        }),
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => setShowUserInfos(false))
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  ////////////////////////////////////////////////////////////////
  function handleAdmin() {
    setModify(true);
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
    setModify(true);
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
    setModify(true);
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
    setModify(true);
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
  useEffect(() => {
    initializeCheckbox();
    let handler = (e) => {
      if (!ref1.current?.contains(e.target)) {
        setShowUserInfos(false);
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
        transition={{ duration : 0.5}}
        className="backdrop2 relative"
      >
        <div
          ref={ref1}
          className="box h-[400px] w-[500px] bg-white absolute lg:top-20 lg:right-[30%] xl:top-28 xl:right-[35%] rounded-md text-[14px]"
        >
          <div className="relative w-[100%] h-[100%] p-9">
            {modify ? (
              <>
                <motion.button
                  whileTap={{ y: 5 }}
                  className="absolute bottom-3 right-3 rounded-md text-white bg-green-color px-4 py-2 text-center w-[120px] hover:bg-dark-green"
                  onClick={() => updateUser(user)}
                >
                  Enregistrer
                </motion.button>
                <motion.button
                  whileTap={{ y: 5 }}
                  className="absolute bottom-3 left-3 rounded-md text-white bg-red-500 px-4 py-2 text-center w-[120px] hover:bg-red-600"
                  onClick={() => setShowUserInfos(false)}
                >
                  Annuler
                </motion.button>
              </>
            ) : null}
            <p className="text-center font-semibold text-[15px]">
              <span>{user.lastName}</span> <span>{user.firstName}</span>
            </p>
            <div className="flex flex-row gap-2 mt-9">
              <button onClick={handleAdmin}>
                <Checkbox boxchecked={isAdmin} />
              </button>

              <p>Administrateur</p>
            </div>
            <p className="mt-9 ml-3 font-medium">Cet utilisateur peut :</p>
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserInfos;
