import { Dispatch } from "react";
import { Server } from "../../../App";
import ServerButton from "./ServerButton";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CreateServerButton from "./CreateServerButton";

interface Combine {
  draggableId: string;
  droppableId: string;
}

type Props = {
  serverList: Server[];
  setServerList: Dispatch<React.SetStateAction<Server[]>>;
  handleOnChangeServer: (newServer: Server) => void;
};

function SidebarServer({
  serverList,
  setServerList,
  handleOnChangeServer,
}: Props) {
  const onDragEnd = (result: any) => {
    if (result.destination) {
      const newItems = [...serverList];
      const [removed] = newItems.splice(result.source.index, 1);

      newItems.splice(result.destination.index, 0, removed);
      setServerList(newItems);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#16141f] py-2">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {serverList.map((currentServer, index) => (
                <Draggable
                  key={currentServer.id}
                  draggableId={currentServer.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <ServerButton
                      handleOnChangeServer={handleOnChangeServer}
                      provided={provided}
                      snapshot={snapshot}
                      serverData={currentServer}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <CreateServerButton />
    </div>
  );
}

export default SidebarServer;
