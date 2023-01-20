import React from "react";

function SidebarRoom({ name, isSelected, handleOnChangeRoom }) {
  return (
    <div
      className={`mx-3 px-2 py-1 my-1 
      ${
        isSelected ? "bg-slate-700" : "cursor-pointer"
      } rounded-md font-bold hover:bg-slate-700`}
      onClick={(event) => {
        handleOnChangeRoom(event, name);
      }}
    >
      <span>{name}</span>
    </div>
  );
}

export default SidebarRoom;
