import React, { FC, SyntheticEvent } from "react";
import { Room } from "../App";
import SidebarRoom from "./SidebarRoom";

type Props = {
  roomList: Room[];
  selectedRoom: string | undefined;
  handleOnChangeRoom: (event: SyntheticEvent, room: string) => void;
};

const Sidebar: FC<Props> = ({ roomList, selectedRoom, handleOnChangeRoom }) => {
  return (
    <div className="w-full h-full flex flex-col flex-grow bg-gray-800">
      {/* sidebar header */}
      <div className="w-full flex justify-start  py-3 border-b-2 border-gray-900 mb-2">
        <span className="text-center text-lg mx-3 px-2 font-bold">
          Available Rooms
        </span>
      </div>
      <div>
        {roomList.map((room) => {
          return (
            <SidebarRoom
              key={room.id}
              title={room.title}
              isSelected={selectedRoom === room.title}
              handleOnChangeRoom={handleOnChangeRoom}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
