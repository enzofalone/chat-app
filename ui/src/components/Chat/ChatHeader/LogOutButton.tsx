import React, { useContext } from "react";
import { UserContext, UserContextContent } from "../../../contexts/user";
import { motion } from "framer-motion";

type Props = {};

function LogOutButton(props: Props) {
  const { logOutUser, user } = useContext<UserContextContent>(UserContext);

  const onLogOutClick = () => {
    if(user.username) logOutUser();
  }

  return (
    user.username ? <motion.button
      className="bg-red-700 p-2 h-full ml-auto mr-6 rounded-md my-0 font-bold"
      onClick={onLogOutClick}
      whileHover={{scale:1.1}}
      whileTap={{scale:0.9}}
    >
      Log Out
    </motion.button> : <></>
  );
}

export default LogOutButton;
