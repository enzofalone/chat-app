import axios from "axios";
import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { API_BASE_URL } from "../constants";
import { UserContext, UserContextContent } from "./user";
import { Channel, Message, Server } from "../common/types";
import { ServerContext, ServerContextContent } from "./server";
import { socket } from "../service/socket";
import { MessageContext, MessageContextContent } from "./message";

interface Props {
  children: any;
}

export type ChannelContextContent = {
  channelList: Channel[];
  setChannelList: Dispatch<Channel[]>;
  fetchingChannel: boolean;
  setSelectedChannel: Dispatch<Channel>;
  selectedChannel: Channel | undefined;
  handleOnChangeChannel: Function;
  messagesFromChannel: Message[];
};

export const ChannelContext: any = createContext<ChannelContextContent>({
  channelList: [],
  setChannelList: () => {},
  fetchingChannel: false,
  setSelectedChannel: () => {},
  selectedChannel: undefined,
  handleOnChangeChannel: () => {},
  messagesFromChannel: [],
});

export const ChannelContextProvider: React.FC<Props> = ({
  children,
}: Props) => {
  const [selectedChannel, setSelectedChannel] = useState<Channel>();
  const [fetchingChannel, setFetchingChannel] = useState(false);
  const [channelList, setChannelList] = useState<Channel[]>([]);
  const [messagesFromChannel, setMessagesFromChannel] = useState<Message[]>([]);

  // context imports
  const { user } = useContext<UserContextContent>(UserContext);
  const { selectedServer, serverList } =
    useContext<ServerContextContent>(ServerContext);

  const fetchChannels = async () => {
    if (!selectedServer) return;

    // TODO: parse user keys to whatever we need
    if (!user._id) return;

    // clean
    setChannelList([]);

    setFetchingChannel(true);

    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const receivedChannelList = await axios.get(
        `${API_BASE_URL}/channel/?serverId=${selectedServer?.id}`,
        config
      );
      // store fetched channels array
      setChannelList(receivedChannelList.data || []);

      // set selected channel (for now) to the first channel we get
      handleOnChangeChannel(receivedChannelList.data[0]);
    } catch (error) {
      console.error(error);
    }

    setFetchingChannel(false);
  };

  /**
   * callback Event for channel buttons / every time we change servers to fetch all channels and perform a cleanup
   */
  const handleOnChangeChannel = (newChannel: Channel) => {
    socket.emit(
      "join-channel",
      { prevChannel: selectedChannel, newChannel, user: user },
      (messages: Message[]) => {
        // get message list from callback
        setMessagesFromChannel(messages);
      }
    );

    setSelectedChannel(newChannel);
  };

  useEffect(() => {
    if (user) {
      fetchChannels();
    }
  }, [selectedServer]);

  const contextValues: ChannelContextContent = {
    channelList,
    setChannelList,
    fetchingChannel,
    setSelectedChannel,
    selectedChannel,
    handleOnChangeChannel,
    messagesFromChannel,
  };

  return (
    <ChannelContext.Provider value={contextValues}>
      {children}
    </ChannelContext.Provider>
  );
};
