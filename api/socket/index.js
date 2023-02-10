const { Server } = require("socket.io");

const addMessageEvents = require("./message");
const addRoomEvents = require("./room");

const init = (server) => {
  // initialize socket.io server
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  // set up socket.io events
  io.on("connection", (socket) => {
    addMessageEvents(socket);
    addRoomEvents(socket);
  });
};

module.exports = init;
