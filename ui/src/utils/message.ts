import { Message } from "../App";

// maintain consistent objects
export const createMessage = (
    id: number | string,
    name: string,
    text: string,
    room: string
): Message => {
    return {
        id,
        name,
        text,
        room,
    };
};
