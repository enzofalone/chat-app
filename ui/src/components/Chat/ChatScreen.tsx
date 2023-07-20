import { FC } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import ChatMessage from "./ChatMessage";
import { Message } from "../../common/types";

type Props = {
  messageList: Message[];
};

const ChatScreen: FC<Props> = ({ messageList }) => {
  const messageEndRef = useRef<any>();

  useEffect(() => {
    messageEndRef.current.scrollIntoView();
  }, [messageList]);

  return (
    <div className="messages overflow-auto">
      {messageList?.length ? (
        messageList?.map((message, index) => {
          return (
            <ChatMessage
              key={index}
              author={message.user?.username || message?.name}
              messageContent={message.text}
              messageDate={message?.createdAt}
              messageStatus={message?.status}
              imageSrc={message?.user?.picture}

            />
          );
        })
      ) : (
        <></>
      )}
      {/* empty div so every time component re-renders we can see the latest messages */}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatScreen;
