const { Server } = require("socket.io");
const Room = require("../controllers/room");
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
  io.on("connection", async (socket) => {
    addMessageEvents(socket);
    addRoomEvents(socket);

    console.log("Connected sockets is now: " + socket.adapter.sids.size);

    const roomList = await Room.getAll();

    socket.emit("handshake", roomList.data);

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
