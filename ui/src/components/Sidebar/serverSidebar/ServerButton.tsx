import { motion } from "framer-motion";
import { SyntheticEvent } from "react";
import { Server } from "../../../common/types";

type Props = {
  serverData: any;
  provided: any;
  snapshot: any;
  handleOnChangeServer: Function;
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
        className={` mb-2 mx-2 ${
          isSelected
            ? "bg-green-900 rounded-[10%]"
            : "bg-blue-900 rounded-[30%]"
        } bg-blue-900 transition-all duration-[50ms] hover:border-[4px] border-gray-800 cursor-pointer w-[50px] h-[50px] flex justify-center align-middle place-content-center`}
        onClick={handleOnClick}
      >
        <span
          className="text-center h-fit place-self-center
        "
        >
          {serverData?.name[0] ? serverData?.name[0] : ''}
        </span>
      </motion.div>
    </div>
  );
}

export default ServerButton;
