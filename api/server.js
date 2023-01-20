require("colors");

const { UI_PORT, PORT } = require("./config");
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

const http = require("http");
const server = http.createServer(app);
const db = require("./db");
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: [`http://localhost:${UI_PORT}`],
    },
});

// routes
const routesRooms = require("./routes/rooms");
const routesUser = require("./routes/user");
// const routesAuth = require("./routes/auth");

// middleware
app.use(bodyParser.json());
app.use(cors());

// set up routes
// app.use("/routes/", routesAuth);
app.use("/rooms/", routesRooms);
app.use("/user/", routesUser);

// test
app.get("/", (req, res, next) => {
    res.json({ Hello: "world" });
});

// set up socket.io

// TODO: refactor code and throw socket events outside of index file
io.on("connection", (socket) => {
    console.log("Connected!");

    socket.on("send-message", (message) => {
        console.log(message.id, message.text);

        socket.to(message.room).emit("receive-message", {
            ...message,
            name: message.name || message.id,
        });
    });

    socket.on("join-room", (obj, cb) => {
        console.log(obj);
        socket.join(obj.room);
        socket.leave(obj.prevRoom);

        cb({ name: "Server", text: "Successfully joined " + obj.room + "!" });

        socket.to(obj.prevRoom).emit("receive-message", {
            id: socket.id,
            name: "Server",
            text: `${socket.id} left ${obj.room}`,
        });

        socket.to(obj.room).emit("receive-message", {
            id: socket.id,
            name: "Server",
            text: `${socket.id} joined ${obj.room}`,
        });

        console.log(socket.id, "joined", obj.room);
    });
});

// init HTTP server
server.listen(PORT, () => {
    console.log(`Server running on`.blue, `http://localhost:${PORT}`);
});
