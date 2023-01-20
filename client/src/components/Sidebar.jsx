import React from "react";
import SidebarRoom from "./SidebarRoom";

function Sidebar({ roomList, selectedRoom, handleOnChangeRoom }) {
    return (
        <div className="w-full h-full flex flex-col flex-grow bg-gray-800">
            {/* sidebar header */}
            <div className="w-full flex justify-start  py-3 border-b-2 border-gray-900 mb-2">
                <span className="text-center text-lg mx-3 px-2 font-bold">
                    Available Rooms
                </span>
            </div>
            <div>
                {Object.keys(roomList).map((room, idx) => {
                    return (
                        <SidebarRoom
                            key={roomList[room]._id}
                            name={roomList[room].name}
                            isSelected={selectedRoom === roomList[room].name}
                            handleOnChangeRoom={handleOnChangeRoom}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Sidebar;
