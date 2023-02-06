// maintain consistent message objects
const createMessage = (id, name, text, room) => {
    return {
        id,
        username: name,
        text,
        room,
    };
};

module.exports = createMessage;
