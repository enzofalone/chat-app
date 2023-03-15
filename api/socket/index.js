const { Server } = require("socket.io");
const Channel = require("../controllers/channel");
const addMessageEvents = require("./message");
const addChannelEvents = require("./channel");

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
    addChannelEvents(socket);

    console.log("Connected sockets are now: " + socket.adapter.sids.size);

    // socket.emit("handshake", channelList.data);

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
