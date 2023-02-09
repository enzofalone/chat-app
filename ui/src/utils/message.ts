import { Message, User } from "../App";

// maintain consistent object keys
export const createMessage = (
  id: number | string,
  user: User,
  text: string,
  roomName: string,
  createdAt: string,
  name?: string
): Message => {
  return {
    id,
    user: user || undefined,
    name: name || undefined,
    text,
    roomName,
    createdAt,
  };
};
