const { createMessage } = require("../utils/message");
const Message = require("../controllers/message");

function addChannelEvents(socket) {
  socket.on("join-channel", async (data, callback) => {
    const { prevChannel, newChannel, user } = data;

    socket.join(newChannel);
    socket.leave(prevChannel);

    // fetch message list
    const newMessages = await Message.findByChannel(newChannel.id);

    // create server message for user's client
    const serverMessage = createMessage(
      0,
      "Server",
      `Successfully joined ${newChannel.name}!`,
      newChannel.name,
      new Date(Date.now()).toISOString()
    );

    // send message list via callback
    callback([...newMessages.data, serverMessage]);

    const messageUserLeft = createMessage(
      socket.id,
      data.prevChannel,
      `${data.username || data.id} left ${data.prevChannel}`,
      data.prevChannel
    );

    const messageUserJoined = createMessage(
      socket.id,
      data.channel,
      `${data.username || data.id} joined ${data.channel}`,
      data.channel,
      new Date(Date.now()).toISOString()
    );

    // message to all other users in previous channel
    socket.to(data.prevChannel).emit("receive-message", messageUserLeft);

    // message to all other users in new channel
    socket.to(data.channel).emit("receive-message", messageUserJoined);
  });
}

module.exports = addChannelEvents;
