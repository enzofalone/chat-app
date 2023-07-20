import { FC, useContext } from "react";
import SidebarChannel from "./channelSidebar/SidebarChannel";
import SidebarServerTitle from "./channelSidebar/SidebarServerTitle";
import SidebarServer from "./serverSidebar/SidebarServer";
import { ServerContext, ServerContextContent } from "../../contexts/server";
1;

type Props = {};

const Sidebar: FC<Props> = ({}) => {
  const { selectedServer } = useContext<ServerContextContent>(ServerContext);

  return (
    <div className="w-full h-full flex flex-row flex-:wgrow bg-gray-800">
      <div className="sidebar-server-container border-r-[1px] border-gray-700">
        <SidebarServer />
      </div>
      {/* sidebar header */}
      <div className="flex w-full h-full flex-col">
        <SidebarServerTitle title={selectedServer?.name} />
        <SidebarChannel />
      </div>
    </div>
  );
};

export default Sidebar;
