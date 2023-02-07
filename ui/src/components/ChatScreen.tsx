import React, { FC } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Message } from "../App";
import ChatMessage from "./ChatMessage";

type Props = {
    messageList: Message[];
};

const ChatScreen: FC<Props> = ({ messageList }) => {
    const messageEndRef = useRef<any>();

    useEffect(() => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messageList]);

    return (
        <div className="messages overflow-auto">
            {messageList?.map((message, index) => {
                return (
                    <ChatMessage
                        key={index}
                        author={message.name}
                        messageContent={message.text}
                        messageDate={""}
                        imageSrc={""}
                    />
                );
            }) || <></>}
            {/* empty div so every time component re-renders we can see the latest messages */}
            <div ref={messageEndRef} />
        </div>
    );
};

export default ChatScreen;