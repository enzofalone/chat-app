import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ServerButton from "../serverSidebar/ServerButton";
import CreateChannelButton from "./CreateChannelButton";
import SidebarChannelButton from "./ChannelButton";
import { Channel } from "../../../App";
import { Dispatch } from "react";

type Props = {
  serverId: string | undefined;
  selectedChannel: Channel | undefined;
  channelList: Channel[];
  setChannelList: Dispatch<Channel[]>;
  handleOnChangeChannel: (newChannel: Channel) => void;
};

const SidebarChannel = ({
  serverId,
  selectedChannel,
  handleOnChangeChannel,
  channelList,
  setChannelList,
}: Props) => {
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
                  draggableId={currentChannel.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <SidebarChannelButton
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
      <CreateChannelButton
        serverId={serverId}
        handleOnChangeChannel={handleOnChangeChannel}
      />
    </div>
  );
};

export default SidebarChannel;
