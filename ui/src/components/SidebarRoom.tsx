import React, { FC, SyntheticEvent } from "react";
import { Room } from "../App";

type Props = {
    title: string;
    isSelected: boolean;
    handleOnChangeRoom: (event: SyntheticEvent, room: string) => void;
};

const SidebarRoom: FC<Props> = ({ title, isSelected, handleOnChangeRoom }) => {
    return (
        <div
            className={`mx-3 px-2 py-1 my-1 
      ${
          isSelected ? "bg-slate-700" : "cursor-pointer"
      } rounded-md font-bold hover:bg-slate-700`}
            onClick={(event) => {
                handleOnChangeRoom(event, title);
            }}
        >
            <span>{title}</span>
        </div>
    );
};

export default SidebarRoom;
