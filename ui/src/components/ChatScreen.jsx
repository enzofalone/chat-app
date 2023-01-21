import React, { useMemo } from "react";
import ChatMessage from "./ChatMessage";

function ChatScreen({ messageList }) {
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
        </div>
    );
}

export default ChatScreen;
