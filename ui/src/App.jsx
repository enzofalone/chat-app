import { socket } from "./service/socket";
import { useEffect, useState } from "react";
import "./App.css";
import ChatScreen from "./components/ChatScreen";
import ChatInput from "./components/ChatInput";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import axios from "axios";
import NoRoomScreen from "./components/NoRoomScreen";

function App() {
    const [messageList, setMessageList] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [fetching, setFetching] = useState(false);
    const [username, setUsername] = useState("");
    const [isUsernameDone, setIsUsernameDone] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [roomList, setRoomList] = useState([]);

    const createMessage = () => {
        return {
            id: socket.id,
            name: username,
            text: inputValue,
            room: selectedRoom,
        };
    };

    const handleOnSend = (e) => {
        e.preventDefault();

        if (!inputValue.length) return;
        if (!selectedRoom.length) return;

        const newMessage = createMessage();

        // send message to server
        socket.emit("send-message", newMessage);

        // add message to client
        addMessage(newMessage);

        setInputValue("");
    };

    const handleOnChangeRoom = (e, roomName) => {
        e.preventDefault();

        socket.emit(
            "join-room",
            { room: roomName, prevRoom: selectedRoom },
            (message) => {
                addMessage(message);
            }
        );

        setSelectedRoom(roomName);
    };

    const addMessage = (message) => {
        setMessageList((prevList) => [...prevList, message]);
    };

    const fetchRooms = async () => {
        setFetching(true);

        try {
            const response = await axios.get("http://localhost:3000/rooms/");

            setRoomList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOnSubmitUsername = (e) => {
        e.preventDefault();

        setIsUsernameDone(true);
    };

    useEffect(() => {
        socket.on("connect", () => {
            addMessage({ name: socket.id, text: `connected as ${socket.id}` });
        });

        socket.on("receive-message", (message) => {
            addMessage(message);
        });

        fetchRooms();
    }, []);

    return (
        <div className="App bg-gray-900 flex flex-row w-[100vw] h-[100vh]">
            <div className={"w-[20vw] h-screen"}>
                <Sidebar
                    roomList={roomList}
                    selectedRoom={selectedRoom}
                    handleOnChangeRoom={handleOnChangeRoom}
                />
            </div>
            <div className="flex-grow flex flex-col">
                <div className="message-list-container flex-grow">
                    <ChatHeader
                        title={selectedRoom ? selectedRoom : "Chat App 😮"}
                    />
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
                <div className="controls">
                    <ChatInput
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        handleOnSend={handleOnSend}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
