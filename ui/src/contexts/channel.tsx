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
  addMessage: Function;
  handleOnChangeChannel: Function;
};

export const ChannelContext: any = createContext<ChannelContextContent>({
  channelList: [],
  setChannelList: () => {},
  fetchingChannel: false,
  setSelectedChannel: () => {},
  selectedChannel: undefined,
  addMessage: () => {},
  handleOnChangeChannel: () => {},
});

export const ChannelContextProvider: React.FC<Props> = ({
  children,
}: Props) => {
  const [selectedChannel, setSelectedChannel] = useState<Channel>();
  const [fetchingChannel, setFetchingChannel] = useState(false);
  const [channelList, setChannelList] = useState<Channel[]>([]);

  // context imports
  const { setMessageList, messageList } =
    useContext<MessageContextContent>(MessageContext);
  const { user } = useContext<UserContextContent>(UserContext);
  const { selectedServer, serverList } =
    useContext<ServerContextContent>(ServerContext);

  const fetchChannels = async () => {
    if (!selectedServer) return;
    // todo parse user keys to whatever we need
    if (!user._id) return;

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

  const handleOnChangeChannel = (newChannel: Channel) => {
    setMessageList([]);

    socket.emit(
      "join-channel",
      { prevChannel: selectedChannel, newChannel, user: user },
      (messages: Message[]) => {
        // get message list from callback
        setMessageList(messages);
      }
    );

    setSelectedChannel(newChannel);
  };
  const addMessage = (message: Message) => {
    const newList = [...messageList, message];

    setMessageList(newList);
  };

  useEffect(() => {
    fetchChannels();
  }, [serverList, selectedServer]);

  const contextValues: ChannelContextContent = {
    channelList,
    setChannelList,
    fetchingChannel,
    setSelectedChannel,
    selectedChannel,
    addMessage,
    handleOnChangeChannel
  };

  return (
    <ChannelContext.Provider value={contextValues}>
      {children}
    </ChannelContext.Provider>
  );
};
