require("colors");
require("./passport");

const { UI_PORT, PORT, CLIENT_URL } = require("./config");
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const createMessage = require("./utils/message");
const morgan = require("morgan");

const http = require("http");
const server = http.createServer(app);
const db = require("./db");
const cookieSession = require("cookie-session");
const passport = require("passport");

// socket server
const ioServer = require("./socket")(server);

// routes
const routesAuth = require("./routes/auth");
const routesRooms = require("./routes/channels");
const routesMessages = require("./routes/messages");
const routesServer = require("./routes/server");

// middleware
app.use(bodyParser.json());

// cors
app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// logging
app.use(morgan("short"));

// cookies
app.use(
  cookieSession({
    name: "session",
    keys: ["app"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// passport.js
app.use(passport.initialize());
app.use(passport.session());

// set up app routes
app.use("/auth/", routesAuth);
app.use("/channel/", routesRooms);
app.use("/messages/", routesMessages);
app.use("/server/", routesServer);

// test endpoint
app.get("/", (req, res, next) => {
  res.status(200).json({ ping: "pong" });
});

// generic error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

// init HTTP server
server.listen(PORT, () => {
  console.log(`Server running on`.blue, `http://localhost:${PORT}`);
});
