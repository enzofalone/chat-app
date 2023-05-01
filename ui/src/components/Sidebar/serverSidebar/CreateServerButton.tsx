import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent, Dispatch } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@mantine/core";
import axios from "axios";
import { API_BASE_URL } from "../../../constants";
import { Server } from "../../../App";

type Props = {
  handleOnChangeServer: (newServer: Server) => void;
  setServerList: Dispatch<any>;
};

function CreateServerButton({ handleOnChangeServer, setServerList }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [inputs, setInputs] = useState({
    serverName: "",
  });

  const handleOnCreateServer = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = {
        serverName: inputs.serverName,
      };

      const newServer = await axios.post(
        `${API_BASE_URL}/server/`,
        data,
        config
      );

      if (newServer) {
        // append to user list
        setServerList((prevServers: Server[]) => [
          ...prevServers,
          newServer.data,
        ]);

        // set to user
        handleOnChangeServer(newServer.data);

        // close modal
        close();
      }
    } catch (error) {
      console.error(error);
    }
  };
  // TODO: STYLE MODAL
  return (
    <div className="w-[50px] h-[50px] mb-2 mx-2 flex justify-center">
      <motion.div
        whileTap={{ scale: 0.95 }}
        whileHover={{scale: 1.05}}
        className={`bg-blue-900 transition-all duration-[50ms] hover:border-[4px] border-gray-800 cursor-pointer rounded-[30%]  w-[50px] h-[50px] flex justify-center place-content-center my-auto`}
        onClick={open}
      >
        {/* this is a placeholder, replace with quality image */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-plus w-full h-full p-3"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 5l0 14"></path>
          <path d="M5 12l14 0"></path>
        </svg>
      </motion.div>
      <Modal
        opened={opened}
        onClose={close}
        title="Create new server 😮😮"
        centered
      >
        {/* Modal content */}
        <form
          className="flex flex-col justify-start  "
          onSubmit={handleOnCreateServer}
        >
          {Object.entries(inputs).map(([category, value], idx) => {
            return (
              <div key={category} className="my-4 flex flex-col">
                <h3>{category}</h3>
                <input
                  key={idx}
                  name={category}
                  value={value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setInputs({ ...inputs, [e.target.name]: e.target.value });
                  }}
                />
              </div>
            );
          })}
          <Button type="submit" color="indigo">
            Create!
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default CreateServerButton;
