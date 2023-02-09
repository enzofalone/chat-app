// maintain consistent message objects
const createMessage = (id, username, text, roomName) => {
  return {
    id,
    username,
    text,
    roomName,
  };
};

// when getting back from database, parse back into a JavaScript Object
const parseMessage = (messageObject) => {
  return {
    createdAt: messageObject.createdAt,
    text: messageObject.text,
    user: JSON.parse(messageObject.user),
  };
};

module.exports = { parseMessage, createMessage };
