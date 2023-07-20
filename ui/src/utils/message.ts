import { v4 as uuidv4 } from "uuid";
import { User, MessageStatus, Message } from "../common/types";

export const generateTemporaryId = (): string => {
  return uuidv4();
};

// maintain consistent object keys
export const createMessage = (
  id: number | string,
  user: User,
  text: string,
  channelId: string,
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
    channelId,
    createdAt,
  };
};
