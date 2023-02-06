require("colors");

const { UI_PORT, PORT } = require("./config");
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

const http = require("http");
const server = http.createServer(app);
const db = require("./db");
const { Server } = require("socket.io");

// routes
const routesRooms = require("./routes/rooms");
const routesUser = require("./routes/user");
const routesMessages = require("./routes/messages");
const createMessage = require("./utils/message");

// socket events
const addMessageEvents = require("./socket/message");
const addRoomEvents = require("./socket/room");

// middleware
app.use(bodyParser.json());
app.use(cors());

// set up routes
// app.use("/routes/", routesAuth);
app.use("/rooms/", routesRooms);
app.use("/user/", routesUser);
app.use("/messages/", routesMessages);

app.get("/", (req, res, next) => {
    res.json({ Hello: "world" });
});

// generic error handling
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

// initialize socket.io server
const io = new Server(server, {
    cors: {
        origin: [`http://localhost:${UI_PORT}`],
    },
});

// set up socket.io events
io.on("connection", (socket) => {
    addMessageEvents(socket);
    addRoomEvents(socket);
});

// init HTTP server
server.listen(PORT, () => {
    console.log(`Server running on`.blue, `http://localhost:${PORT}`);
});
