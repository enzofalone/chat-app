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
      data.roomName
    );

    // send message list via callback
    callback([...newMessages.data, serverMessage]);

    // message to all other users in previous room
    socket
      .to(data.prevRoom)
      .emit(
        "receive-message",
        createMessage(
          socket.id,
          data.prevRoom,
          `${data.username || data.id} left ${data.prevRoom}`,
          data.prevRoom
        )
      );
    // message to all other users in new room
    socket
      .to(data.room)
      .emit(
        "receive-message",
        createMessage(
          socket.id,
          data.room,
          `${data.username || data.id} joined ${data.room}`,
          data.room
        )
      );
  });
}

module.exports = addRoomEvents;
