import { socket } from "./service/socket";
import { useEffect, useState } from "react";
import "./App.css";
import ChatScreen from "./components/ChatScreen";
import ChatInput from "./components/ChatInput";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import axios from "axios";

function App() {
    const [messageList, setMessageList] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [fetching, setFetching] = useState(false);

    const [selectedRoom, setSelectedRoom] = useState("");
    const [roomList, setRoomList] = useState([]);

    const handleOnSend = (e) => {
        e.preventDefault();

        if (!inputValue.length) return;

        // send message to server
        socket.emit("send-message", {
            text: inputValue,
            id: socket.id,
            room: selectedRoom,
        });

        // add message to client
        addMessage({ id: socket.id, text: inputValue, name: socket.id });
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
            console.log(response.data);
            setRoomList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        socket.on("connect", () => {
            addMessage({ name: socket.id, text: `connected as ${socket.id}` });
        });

        socket.on("receive-message", (message) => {
            addMessage(message);
            console.log(message);
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
                    <ChatHeader />
                    <ChatScreen messageList={messageList} />
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
