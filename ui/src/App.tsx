import { socket } from "./service/socket";

import { useEffect, useState, SyntheticEvent } from "react";
import ChatScreen from "./components/ChatScreen";
import ChatInput from "./components/ChatInput";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import axios from "axios";
import NoRoomScreen from "./components/NoRoomScreen";
import { API_BASE_URL } from "./constants";
import { createMessage } from "./utils/message";

export type Message = {
  id: string | number | undefined;
  name: string;
  text: string;
  room: string | undefined;
};

export type Room = {
  id: string | number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

function App() {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isUsernameDone, setIsUsernameDone] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [fetching, setFetching] = useState(false);

  // TODO: MOVE EVERYTHING TO A CONTEXT

  const handleOnSend = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!inputValue.length) return;
    if (!selectedRoom) return;

    const newMessage = createMessage(
      socket.id,
      username,
      inputValue,
      selectedRoom
    );

    // send message to server
    socket.emit("send-message", newMessage);

    // add message to client
    addMessage(newMessage);

    setInputValue("");
  };

  const handleOnChangeRoom = (e: SyntheticEvent, roomTitle: string) => {
    e.preventDefault();

    setMessageList([]);

    socket.emit(
      "join-room",
      { prevRoom: selectedRoom, room: roomTitle, username },
      (message: Message) => {
        addMessage(message);
      }
    );

    setSelectedRoom(roomTitle);
  };

  const addMessage = (message: Message) => {
    setMessageList((prevList) => [...prevList, message]);
  };

  const fetchRooms = async () => {
    setFetching(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/rooms/`);

      setRoomList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnSubmitUsername = (e: SyntheticEvent) => {
    e.preventDefault();

    setIsUsernameDone(true);
  };

  const openGoogleSignIn = async () => {
    window.open(`${API_BASE_URL}/auth/google`, "_self");
  };

  const openGithubSignIn = async () => {
    window.open(`${API_BASE_URL}/auth/github`, "_self");
  };

  useEffect(() => {
    socket.on("connect", () => {
      // nothing yet
    });

    socket.on("receive-message", (message: Message) => {
      addMessage(message);
    });

    fetchRooms();
  }, []);

  return (
    // TODO: ADD ROUTER (AND ADD LOGIN SCREEN WITH GOOGLE)

    <div className="App bg-gray-900 flex flex-row w-[100vw] h-[100vh]">
      {/* SIDEBAR */}
      <button onClick={openGoogleSignIn}>Login with Google</button>
      {/* <button onClick={openGithubSignIn}>Login with Github</button> */}
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
          {selectedRoom && isUsernameDone ? (
            <ChatScreen messageList={messageList} />
          ) : (
            <NoRoomScreen
              isUsernameDone={isUsernameDone}
              username={username}
              setUsername={setUsername}
              handleOnSubmitUsername={handleOnSubmitUsername}
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
