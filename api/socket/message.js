const Message = require("../controllers/message");
const { parseMessage } = require("../utils/message");

function addMessageEvents(socket) {
  socket.on("send-message", async (message, isDelivered) => {
    const temporaryMessageId = message.id;

    const messageObject = {
      user: JSON.stringify(message.user),
      text: message.text,
      channelId: message.channelId,
    };

    const newMessageResult = await Message.create(messageObject);

    if (newMessageResult.data) {
      socket
        .to(message.room)
        .emit("receive-message", parseMessage(newMessageResult.data));
    }

    // let client know the message was successful
    isDelivered(
      temporaryMessageId,
      newMessageResult.data,
      newMessageResult.error ? false : true
    );
  });
}

module.exports = addMessageEvents;
