import React, { useMemo } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import ChatMessage from "./ChatMessage";

function ChatScreen({ messageList }) {
    const messageEndRef = useRef(null);

    useEffect(() => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        console.log("opa");
    }, [messageList]);

    return (
        <div className="messages overflow-auto">
            {messageList?.map((message, index) => {
                return (
                    <ChatMessage
                        key={index}
                        author={message.name}
                        messageContent={message.text}
                    />
                );
                
            }) || <></>}
            {/* empty div so every time component re-renders we can see the latest messages */}
            <div ref={messageEndRef} />
        </div>
    );
}

export default ChatScreen;
