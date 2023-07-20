import {
  Dispatch,
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Message, MessageStatus } from "../common/types";
import { ChannelContext, ChannelContextContent } from "./channel";
import { ApiMessage } from "../service/apiMessage";
import { API_BASE_URL } from "../constants";
import { UserContext, UserContextContent } from "./user";

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

const apiMessage = new ApiMessage(API_BASE_URL);

export const MessageContextProvider: FC<Props> = ({ children }: Props) => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [pendingList, setPendingList] = useState<Message[]>([]);

  const { user } = useContext<UserContextContent>(UserContext);
  const { selectedChannel } = useContext<ChannelContextContent>(ChannelContext);

  const addMessage = (message: Message) => {
    setMessageList((prevList: Message[]) => {
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

  // callback after getting message back from server with "status"
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

  // function to fetch for messages BASED on the current channel the app is
  const fetchMessages = async () => {
    if (!selectedChannel?.id) return;

    try {
      const { data } = await apiMessage.get(selectedChannel?.id);

      console.log("new messages fetched", data);

      setMessageList(data);
    } catch (error: unknown) {
      console.error("error fetching messages", error);
    }
  };

  // fetch messages every time the channel has been changed
  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [selectedChannel]);

  // set to delivered all messages that were marked as "received" in the callback
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
