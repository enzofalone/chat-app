import { socket } from "./service/socket";
import { useEffect, useState, useRef } from "react";
import "./App.css";
import ChatScreen from "./components/ChatScreen";
import ChatInput from "./components/ChatInput";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import axios from "axios";
import NoRoomScreen from "./components/NoRoomScreen";
import { API_BASE_URL } from "./constants";

function App() {
    const [messageList, setMessageList] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [username, setUsername] = useState("");
    const [isUsernameDone, setIsUsernameDone] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [roomList, setRoomList] = useState([]);
    const [fetching, setFetching] = useState(false);

    // TODO: MOVE EVERYTHING TO A CONTEXT

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

        setMessageList([]);

        socket.emit(
            "join-room",
            { room: roomName, prevRoom: selectedRoom, name: username },
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
            const response = await axios.get(`${API_BASE_URL}rooms/`);

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
            // nothing yet
        });

        socket.on("receive-message", (message) => {
            addMessage(message);
        });

        fetchRooms();
    }, []);

    return (
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
                    title={selectedRoom ? selectedRoom : "Chat App 😮"}
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
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
