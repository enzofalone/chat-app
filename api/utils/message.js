const createMessage = (id, name, text, room) => {
    return {
        id,
        name,
        text,
        room,
    };
};

module.exports = createMessage;
