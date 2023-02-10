// maintain consistent message objects
const createMessage = (id, name, text, roomName,createdAt) => {
  return {
    id,
    name,
    text,
    roomName, 
    createdAt
  };
};

// when getting back from database, parse back into a JavaScript Object
// for some reason I can't pass back the same object because its missing these keys??
const parseMessage = (messageObject) => {
  return {
    createdAt: messageObject.createdAt,
    text: messageObject.text,
    user: JSON.parse(messageObject.user),
  };
};

module.exports = { parseMessage, createMessage };
