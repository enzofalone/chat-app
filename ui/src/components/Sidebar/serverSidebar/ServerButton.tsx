import { motion } from "framer-motion";
import { Server } from "../../../App";
type Props = {
  item: any;
  provided: any;
  snapshot: any;
  handleOnChangeServer: (newServer: Server) => void;
};

function ServerButton({
  item,
  provided,
  snapshot,
  handleOnChangeServer,
}: Props) {
  // TODO: if is active, make border white
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
      >
        {item.name}
      </motion.div>
    </div>
  );
}

export default ServerButton;
