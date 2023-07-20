import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent, useContext } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@mantine/core";
import { ServerContext, ServerContextContent } from "../../../contexts/server";

type Props = {};

function CreateServerButton({}: Props) {
  const { createServer } = useContext<ServerContextContent>(ServerContext);
  const [opened, { open, close }] = useDisclosure(false);
  // TODO: STYLE MODAL

  return (
    <div className="w-[50px] h-[50px] mb-2 mx-2 flex justify-center">
      <motion.div
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
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
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 5l0 14"></path>
          <path d="M5 12l14 0"></path>
        </svg>
      </motion.div>
      <CreateServerModal
        opened={opened}
        close={close}
        createServer={createServer}
      />
    </div>
  );
}

type PropsModal = {
  opened: boolean;
  close: () => void;
  createServer: Function;
};

const CreateServerModal = ({ opened, close, createServer }: PropsModal) => {
  const defaultInputs = {
    serverName: "",
  };

  const [inputs, setInputs] = useState(defaultInputs);

  const handleOnCreateServer = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { success } = await createServer(inputs.serverName);

    if (success) {
      // close modal
      setInputs({ serverName: "" });
      close();
    }
  };

  return (
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
                className="bg-slate-900 text-slate-100"
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
  );
};

export default CreateServerButton;
