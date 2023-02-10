require("colors");
require("./passport");

const { UI_PORT, PORT } = require("./config");
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
const routesRooms = require("./routes/rooms");
const routesMessages = require("./routes/messages");

// middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(morgan("short"));

app.use(
  cookieSession({
    name: "session",
    keys: ["app"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// set up app routes
app.use("/auth/", routesAuth);
app.use("/rooms/", routesRooms);
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

// init HTTP server
server.listen(PORT, () => {
  console.log(`Server running on`.blue, `http://localhost:${PORT}`);
});
