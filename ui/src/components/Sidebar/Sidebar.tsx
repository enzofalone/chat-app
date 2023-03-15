import React, { Dispatch, FC, SetStateAction } from "react";
import { Channel, Server } from "../../App";
import SidebarChannel from "./channelSidebar/SidebarChannel";
import SidebarServerTitle from "./channelSidebar/SidebarServerTitle";
import SidebarServer from "./serverSidebar/SidebarServer";
1;

type Props = {
  serverList: Server[];
  setServerList: Dispatch<React.SetStateAction<Server[]>>;
  channelList: Channel[];
  setChannelList: Dispatch<Channel[]>;
  selectedServer: Server | undefined;
  selectedChannel: Channel | undefined;
  setSelectedServer: Dispatch<SetStateAction<Server | undefined>>;
  setSelectedChannel: Dispatch<SetStateAction<Channel | undefined>>;
  handleOnChangeChannel: (newChannel: Channel) => void;
  handleOnChangeServer: (newServer: Server) => void;
};

const Sidebar: FC<Props> = ({
  serverList,
  setServerList,
  channelList,
  setChannelList,
  handleOnChangeChannel,
  selectedChannel,
  selectedServer,
  handleOnChangeServer,
  setSelectedChannel,
}) => {
  return (
    <div className="w-full h-full flex flex-row flex-:wgrow bg-gray-800">
      <div className="sidebar-server-container border-r-[1px] border-gray-700">
        <SidebarServer
          serverList={serverList}
          setServerList={setServerList}
          handleOnChangeServer={handleOnChangeServer}
        />
      </div>
      {/* sidebar header */}
      <div className="flex w-full h-full flex-col">
        <SidebarServerTitle title={selectedServer?.name} />
        <SidebarChannel
          serverId={selectedServer?.id}
          handleOnChangeChannel={handleOnChangeChannel}
          selectedChannel={selectedChannel}
          channelList={channelList}
          setChannelList={setChannelList}
        />
      </div>
    </div>
  );
};

export default Sidebar;
