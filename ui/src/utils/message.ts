import { MessageStatus, Message, User } from "../App";
import { v4 as uuidv4 } from "uuid";

export const generateTemporaryId = (): string => {
  return uuidv4();
};

// maintain consistent object keys
export const createMessage = (
  id: number | string,
  user: User,
  text: string,
  roomName: string,
  createdAt: string,
  status?: MessageStatus,
  name?: string
): Message => {
  return {
    id,
    user: user || undefined,
    name: name || undefined,
    text,
    status,
    roomName,
    createdAt,
  };
};
