import { socket } from "./service/socket";
import { useEffect, useState, SyntheticEvent } from "react";
import ChatScreen from "./components/ChatScreen";
import ChatInput from "./components/ChatInput";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import axios from "axios";
import NoRoomScreen from "./components/NoRoomScreen";
import { API_BASE_URL } from "./constants";
import { createMessage, generateTemporaryId } from "./utils/message";

export type Message = {
  createdAt: string;
  id: string | number | undefined;
  user?: User;
  name?: string;
  text: string;
  roomName: string | undefined;
  status?: MessageStatus;
  success?: boolean;
};

export enum MessageStatus {
  PENDING,
  ERROR,
  DELIVERED,
}

export type Room = {
  id: string | number;
  title: string;
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
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [pendingList, setPendingList] = useState<Message[]>([]);
  const [user, setUser] = useState<User>({});
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [fetching, setFetching] = useState(false);

  const isUserLoggedIn = user._id ? !!user._id.length : false;
  // TODO: MOVE EVERYTHING TO A CONTEXT

  const handleOnSend = (e: SyntheticEvent) => {
    e.preventDefault();

    // TODO: Create toasts
    // TODO: Create error handling and create UI for it
    if (!inputValue.length) return;
    if (!user) return;
    if (!selectedRoom) return;
    if (!isUserLoggedIn) return;

    const newMessage = createMessage(
      generateTemporaryId(),
      user,
      inputValue,
      selectedRoom,
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

  const handleOnChangeRoom = (e: SyntheticEvent, roomTitle: string) => {
    e.preventDefault();

    setMessageList([]);

    socket.emit(
      "join-room",
      { prevRoom: selectedRoom, roomName: roomTitle, user: user },
      (messages: Message[]) => {
        // get message list from callback
        setMessageList(messages);
      }
    );

    setSelectedRoom(roomTitle);
  };

  const addMessage = (message: Message) => {
    setMessageList((prevList) => {
      return [...prevList, message];
    });
  };

  const openGoogleSignIn = async () => {
    window.open(`${API_BASE_URL}/auth/google`, "_self");
  };

  const fetchUser = async () => {
    setFetching(true);

    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.get(
        `${API_BASE_URL}/auth/login/success`,
        config
      );

      if (response.data) {
        setUser(response.data.user);
      }
    } catch (error) {}

    setFetching(false);
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

  useEffect(() => {
    if (pendingList.length) {
      setToDelivered();
    }
  }, [pendingList]);

  useEffect(() => {
    socket.on("connect", () => {});

    socket.on("handshake", (receivedRoomList: Room[]) => {
      setRoomList(receivedRoomList);
    });

    socket.on("receive-message", (message: Message) => {
      addMessage(message);
    });

    socket.on("connect_error", () => {
      setTimeout(() => {
        socket.connect();
      }, 1000);
    });

    fetchUser();
  }, []);

  return (
    // TODO: ADD ROUTER (AND ADD LOGIN SCREEN WITH GOOGLE)

    <div className="App bg-gray-900 flex flex-row w-[100vw] h-[100vh]">
      {/* SIDEBAR */}
      <div className={"w-[20vw] h-screen"}>
        <Sidebar
          roomList={roomList}
          selectedRoom={selectedRoom}
          handleOnChangeRoom={handleOnChangeRoom}
        />
      </div>
      {/* MAIN APP COMPONENTS */}
      <div className="flex-grow flex flex-col">
        <ChatHeader
          title={selectedRoom.length ? selectedRoom : "Chat App 😮"}
        />
        <div className="message-list-container flex-grow min-h-0 overflow-auto">
          {selectedRoom && isUserLoggedIn === true ? (
            <ChatScreen messageList={messageList} />
          ) : (
            <NoRoomScreen
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
