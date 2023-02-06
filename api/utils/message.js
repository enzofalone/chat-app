// maintain consistent message objects
const createMessage = (id, username, text, room) => {
    return {
        id,
        username,
        text,
        room,
    };
};

module.exports = createMessage;
