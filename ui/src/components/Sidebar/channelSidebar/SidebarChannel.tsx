import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CreateChannelButton from "./CreateChannelButton";
import SidebarChannelButton from "./ChannelButton";
import { useContext } from "react";
import {
  ChannelContext,
  ChannelContextContent,
} from "../../../contexts/channel";
import { ServerContext, ServerContextContent } from "../../../contexts/server";

type Props = {};

const SidebarChannel = ({}: Props) => {
  const { selectedServer } = useContext<ServerContextContent>(ServerContext);
  const {
    channelList,
    setChannelList,
    selectedChannel,
    handleOnChangeChannel,
  } = useContext<ChannelContextContent>(ChannelContext);

  const onDragEnd = (result: any) => {
    if (result.destination) {
      const newItems = [...channelList];
      const [removed] = newItems.splice(result.source.index, 1);

      newItems.splice(result.destination.index, 0, removed);
      setChannelList(newItems);
    }
  };

  return (
    <div className="px-2 py-2 bg-[#16141f] w-full h-full border-r-[1px] border-gray-700">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {channelList.map((currentChannel, index) => (
                <Draggable
                  key={currentChannel.id}
                  draggableId={currentChannel.id || index.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <SidebarChannelButton
                      key={currentChannel.id || index}
                      provided={provided}
                      snapshot={snapshot}
                      channelData={currentChannel}
                      isSelected={currentChannel.id === selectedChannel?.id}
                      handleOnChangeChannel={handleOnChangeChannel}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {channelList.length ? (
        <CreateChannelButton
          serverId={selectedServer?.id}
          handleOnChangeChannel={handleOnChangeChannel}
          setChannelList={setChannelList}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SidebarChannel;
