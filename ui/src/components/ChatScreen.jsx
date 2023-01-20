import React from "react";
import ChatMessage from "./ChatMessage";

function ChatScreen({ messageList }) {
  return (
    <div className="messages">
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
