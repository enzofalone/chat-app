import { motion } from "framer-motion";
import { SyntheticEvent } from "react";
import { Server } from "../../../App";
type Props = {
  serverData: any;
  provided: any;
  snapshot: any;
  handleOnChangeServer: (newServer: Server) => void;
  isSelected: boolean;
};

function ServerButton({
  serverData,
  provided,
  snapshot,
  handleOnChangeServer,
  isSelected,
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
        className={` mb-2 mx-2 ${isSelected ? 'bg-green-900 rounded-[10%]' : 'bg-blue-900 rounded-[30%]'} 
          justify-centerbg-blue-900 transition-all duration-[50ms] 
          hover:border-[4px] border-gray-800 
          cursor-pointer w-[50px] h-[50px] flex justify-center place-content-center my-auto`}
        onClick={handleOnClick}
      >
        <div className="my-auto">
        {serverData.name[0]}
        </div>
      </motion.div>
    </div>
  );
}

export default ServerButton;
