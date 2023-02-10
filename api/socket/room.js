const { createMessage } = require("../utils/message");
const Message = require("../controllers/message");

function addRoomEvents(socket) {
  socket.on("join-room", async (data, callback) => {
    socket.join(data.room);
    socket.leave(data.prevRoom);

    // fetch message list
    const newMessages = await Message.findByRoom(data.roomName);

    // create server message for user's client
    const serverMessage = createMessage(
      0,
      "Server",
      `Successfully joined ${data.roomName}!`,
      data.roomName,
      new Date(Date.now()).toISOString()
    );

    // send message list via callback
    callback([...newMessages.data, serverMessage]);

    const messageUserLeft = createMessage(
      socket.id,
      data.prevRoom,
      `${data.username || data.id} left ${data.prevRoom}`,
      data.prevRoom
    );

    const messageUserJoined = createMessage(
      socket.id,
      data.room,
      `${data.username || data.id} joined ${data.room}`,
      data.room,
      new Date(Date.now()).toISOString()
    );

    // message to all other users in previous room
    socket.to(data.prevRoom).emit("receive-message", messageUserLeft);

    // message to all other users in new room
    socket.to(data.room).emit("receive-message", messageUserJoined);
  });
}

module.exports = addRoomEvents;