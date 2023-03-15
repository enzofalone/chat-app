import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@mantine/core";
import axios from "axios";
import { API_BASE_URL } from "../../../constants";

type Props = {};

function CreateServerButton({}: Props) {
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
        console.log(newServer);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[50px] h-[50px] mb-2 mx-2 flex justify-center">
      <motion.div
        whileTap={{ scale: 0.95 }}
        className={`bg-blue-900 transition-all duration-[50ms] hover:border-[4px] border-gray-800 cursor-pointer rounded-[30%] p-5 w-[50px] h-[50px] flex justify-center place-content-center my-auto`}
        onClick={open}
      >
        {/* this is a placeholder, replace with good image */}
        <span className="flex justify-center align-baseline">+</span>
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
