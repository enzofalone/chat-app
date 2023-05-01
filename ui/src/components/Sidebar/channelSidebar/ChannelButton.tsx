import { FC } from "react";
import { Channel } from "../../../common/types";

type Props = {
  isSelected: boolean;
  handleOnChangeChannel: (newChannel: Channel) => void;
  channelData: any;
  provided: any;
  snapshot: any;
};

const SidebarChannelButton: FC<Props> = ({
  isSelected,
  handleOnChangeChannel,
  channelData,
  provided,
  snapshot,
}) => {
  return (
    <div
      ref={provided.innerRef}
      snapshot={snapshot}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div
        className={`px-2 py-1 my-1 cursor-pointer rounded-md font-bold hover:bg-slate-700 
        ${isSelected ? "bg-slate-700" : "cursor-pointer"}`}
        onClick={(event) => {
          handleOnChangeChannel(channelData);
        }}
      >
        <span>{channelData.name}</span>
      </div>
    </div>
  );
};

export default SidebarChannelButton;
