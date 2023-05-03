import ServerButton from "./ServerButton";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CreateServerButton from "./CreateServerButton";
import { useContext } from "react";
import { ServerContext, ServerContextContent } from "../../../contexts/server";

interface Combine {
  draggableId: string;
  droppableId: string;
}

type Props = {};

function SidebarServer({}: Props) {
  const { serverList, setServerList, selectedServer, handleOnChangeServer } =
    useContext<ServerContextContent>(ServerContext);

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
                  draggableId={currentServer.id || index.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <ServerButton
                      isSelected={selectedServer?.id === currentServer.id}
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
