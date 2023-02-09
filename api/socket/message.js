const Message = require("../controllers/message");
const { parseMessage } = require("../utils/message");

function addMessageEvents(socket) {
  socket.on("send-message", async (message) => {

    const messageObject = {
      user: JSON.stringify(message.user),
      text: message.text,
      roomName: message.roomName,
    };

    const newMessage = await Message.create(messageObject);

    socket
      .to(message.room)
      .emit("receive-message", parseMessage(newMessage.data));
  });
}

module.exports = addMessageEvents;
