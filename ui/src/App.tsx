import { socket } from "./service/socket";
import { useEffect, useState, SyntheticEvent, useContext } from "react";
import ChatScreen from "./components/Chat/ChatScreen";
import ChatInput from "./components/Chat/ChatInput";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatHeader from "./components/Chat/ChatHeader";
import axios from "axios";
import NoChannelScreen from "./components/NoChannelScreen";
import { API_BASE_URL } from "./constants";
import { createMessage, generateTemporaryId } from "./utils/message";
import { UserContext, UserContextContent } from "./contexts/user";
import { ServerContext, ServerContextContent } from "./contexts/server";
import { Message, Channel, MessageStatus, Server } from "./common/types";
import { ChannelContext, ChannelContextContent } from "./contexts/channel";
import { MessageContext, MessageContextContent } from "./contexts/message";

function App() {
  const { user } = useContext<UserContextContent>(UserContext);
  const { selectedChannel } = useContext<ChannelContextContent>(ChannelContext);
  const { addMessage, isDeliveredCallback, messageList } =
    useContext<MessageContextContent>(MessageContext);

  const [inputValue, setInputValue] = useState<string>("");

  const isUserLoggedIn = user._id ? !!user._id.length : false;

  const handleOnSend = (e: SyntheticEvent) => {
    e.preventDefault();

    // TODO: Create toasts
    if (!inputValue.length || !user || !selectedChannel || !isUserLoggedIn) {
      console.error("Error sending message!");
      return;
    }

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

  const openGoogleSignIn = async () => {
    window.open(`${API_BASE_URL}/auth/google`, "_self");
  };

  useEffect(() => {
    /**
     * Socket events
     */
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
        <Sidebar />
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
