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

    // error handling
    socket.on("connect_error", () => {
      console.log("Connection failed");
    });
    
    socket.on("reconnect_failed", () => {
      console.log("Reconnection failed");
    });
  });
};

module.exports = init;
