import { socket } from "./service/socket";
import { useEffect, useState, SyntheticEvent, useContext } from "react";
import ChatScreen from "./components/Chat/ChatScreen";
import ChatInput from "./components/Chat/ChatInput";
import Sidebar from "./components/Sidebar/Sidebar";
import axios from "axios";
import NoChannelScreen from "./components/NoChannelScreen";
import { API_BASE_URL } from "./constants";
import { createMessage, generateTemporaryId } from "./utils/message";
import { UserContext, UserContextContent } from "./contexts/user";
import { ServerContext, ServerContextContent } from "./contexts/server";
import ChatHeader from "./components/Chat/ChatHeader/ChatHeader";
export type Server = {
  createdAt: string;
  id: string;
  name?: string;
  channels: Channel[];
};

export type Message = {
  createdAt: string;
  id: string | number | undefined;
  user?: User;
  name?: string;
  text: string;
  channelId: string | undefined;
  status?: MessageStatus;
  success?: boolean;
};

export enum MessageStatus {
  PENDING,
  ERROR,
  DELIVERED,
}

export type Channel = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id?: string;
  username?: string;
  picture?: string;
  googleId?: string;
};

function App() {
  const { user, setUser } = useContext<UserContextContent>(UserContext);
  const { selectedServer, setSelectedServer, fetchingServer, serverList, setServerList} = useContext<ServerContextContent>(ServerContext);

  const [messageList, setMessageList] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [pendingList, setPendingList] = useState<Message[]>([]);

  const [selectedChannel, setSelectedChannel] = useState<Channel>();
  const [fetchingChannel, setFetchingChannel] = useState(false);
  const [channelList, setChannelList] = useState<Channel[]>([]);

  const isUserLoggedIn = user._id ? !!user._id.length : false;
  // TODO: MOVE EVERYTHING TO A CONTEXT

  const handleOnSend = (e: SyntheticEvent) => {
    e.preventDefault();

    // TODO: Create toasts
    if (!inputValue.length) return;
    if (!user) return;
    if (!selectedChannel) return;
    if (!isUserLoggedIn) return;

    const newMessage = createMessage(
      generateTemporaryId(),
      user,
      inputValue,
      selectedChannel.id,
      new Date(Date.now()).toISOString(),
      MessageStatus.PENDING
    );

    // add message to client
    addMessage(newMessage);

    // send message to server
    socket.emit("send-message", newMessage, isDeliveredCallback);
    setInputValue("");
  };

  const isDeliveredCallback = (
    id: string,
    messageData: Message,
    success: boolean
  ) => {
    setPendingList((prevList) => [
      ...prevList,
      { ...messageData, id, success },
    ]);
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

  const handleOnChangeServer = (newServer: Server) => {
    setMessageList([]);
    setChannelList([]);

    setSelectedServer(newServer);
  };

  const addMessage = (message: Message) => {
    setMessageList((prevList) => {
      return [...prevList, message];
    });
  };

  const openGoogleSignIn = async () => {
    window.open(`${API_BASE_URL}/auth/google`, "_self");
  };

  const setToDelivered = () => {
    // get all the ID's received by send-message callbacks and set messages to delivered status
    const pendingListCopy = pendingList;

    while (pendingListCopy.length) {
      const pendingMessage = pendingListCopy.pop();

      if (pendingMessage) {
        const messageIndex = messageList.findIndex(
          (mess) => mess.id === pendingMessage.id
        );

        const status = pendingMessage.success
          ? MessageStatus.DELIVERED
          : MessageStatus.ERROR;

        setMessageList((list) => {
          list[messageIndex].status = status;
          return list;
        });
      }
    }
    setPendingList([]);
  };

 

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
      console.log(receivedChannelList.data);
      setChannelList(receivedChannelList.data || []);

      if (receivedChannelList.data.length) {
        handleOnChangeChannel(receivedChannelList.data[0]);
      }
    } catch (error) {
      console.error(error);
    }

    setFetchingChannel(false);
  };


  useEffect(() => {
    fetchChannels();
  }, [serverList, selectedServer]);

  useEffect(() => {
    if (pendingList.length) {
      setToDelivered();
    }
  }, [pendingList]);

  useEffect(() => {
    socket.on("connect", () => {});

    socket.on("receive-message", (message: Message) => {
      addMessage(message);
    });

    socket.on("connect_error", () => {
      setTimeout(() => {
        socket.connect();
      }, 1000);
    });
  }, []);

  return (
    // TODO: ADD ROUTER (AND ADD LOGIN SCREEN WITH GOOGLE)

    <div className="App bg-[#1c1c24] flex flex-row w-[100vw] h-[100vh]">
      {/* SIDEBAR */}
      <div className={"w-[20vw] h-screen"}>
        <Sidebar
          serverList={serverList}
          setServerList={setServerList}
          channelList={channelList}
          setChannelList={setChannelList}
          handleOnChangeChannel={handleOnChangeChannel}
          selectedChannel={selectedChannel}
          selectedServer={selectedServer}
          setSelectedServer={setSelectedServer}
          setSelectedChannel={setSelectedChannel}
          handleOnChangeServer={handleOnChangeServer}
        />
      </div>
      {/* MAIN APP COMPONENTS */}
      <div className="flex-grow flex flex-col">
        <ChatHeader title={selectedChannel?.name ? selectedChannel.name : ""} />
        <div className="message-list-container flex-grow min-h-0 overflow-auto">
          {selectedChannel && isUserLoggedIn ? (
            <ChatScreen messageList={messageList} />
          ) : (
            <NoChannelScreen
              user={user}
              isUsernameDone={isUserLoggedIn}
              openGoogleSignIn={openGoogleSignIn}
            />
          )}
        </div>
        {/* BOTTOM COMPONENTS (input bar) */}
        <div className="controls">
          <ChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleOnSend={handleOnSend}
            inputRef={null}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
