import { Dispatch, FC, createContext, useEffect, useState } from "react";
import { Message, MessageStatus } from "../common/types";

interface Props {
  children: any;
}

export type MessageContextContent = {
  messageList: Message[];
  setMessageList: Dispatch<Message[]>;
  pendingList: Message[];
  setPendingList: Dispatch<Message[]>;
  addMessage: Function;
  isDeliveredCallback: Function;
};

export const MessageContext: any = createContext({
  messageList: [],
  setMessageList: () => {},
  pendingList: [],
  setPendingList: () => {},
  addMessage: () => {},
  isDeliveredCallback: () => {},
});

export const MessageContextProvider: FC<Props> = ({ children }: Props) => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [pendingList, setPendingList] = useState<Message[]>([]);
  
  const addMessage = (message: Message) => {
    setMessageList((prevList) => {
      return [...prevList, message];
    });
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

  useEffect(() => {
    if (pendingList.length) {
      setToDelivered();
    }
  }, [pendingList]);

  const contextValues: MessageContextContent = {
    messageList,
    setMessageList,
    pendingList,
    setPendingList,
    addMessage,
    isDeliveredCallback,
  };

  return (
    <MessageContext.Provider value={contextValues}>
      {children}
    </MessageContext.Provider>
  );
};
