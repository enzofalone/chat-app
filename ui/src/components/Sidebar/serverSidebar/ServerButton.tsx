import { motion } from "framer-motion";
import { SyntheticEvent } from "react";
import { Server } from "../../../App";
type Props = {
  serverData: any;
  provided: any;
  snapshot: any;
  handleOnChangeServer: (newServer: Server) => void;
};

function ServerButton({
  serverData,
  provided,
  snapshot,
  handleOnChangeServer,
}: Props) {
  // TODO: if is active, make border white

  const handleOnClick = (e: SyntheticEvent) => {
    handleOnChangeServer(serverData);
  };

  return (
    <div
      ref={provided.innerRef}
      snapshot={snapshot}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <motion.div
        whileTap={{ scale: 0.95 }}
        className={` mb-2 mx-2  justify-centerbg-blue-900 transition-all duration-[50ms] hover:border-[4px] border-gray-800 bg-blue-900 cursor-pointer rounded-[30%] p-5 w-[50px] h-[50px] flex justify-center place-content-center my-auto`}
        onClick={handleOnClick}
      >
        {serverData.name}
      </motion.div>
    </div>
  );
}

export default ServerButton;
