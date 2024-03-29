require("dotenv").config();
require("colors");

// TODO: move all .env variables imported here and log if it is empty
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const SOCKET_PORT = process.env.SOCKET_PORT
  ? Number(process.env.SOCKET_PORT)
  : 3001;

const UI_PORT = process.env.UI_PORT ? Number(process.env.UI_PORT) : 5173;

const CLIENT_DEVELOPMENT_URL = process.env.CLIENT_DEVELOPMENT_URL;
const CLIENT_PRODUCTION_URL = process.env.CLIENT_PRODUCTION_URL;

const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? CLIENT_PRODUCTION_URL
    : CLIENT_DEVELOPMENT_URL;

const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET; 

// OAUTH
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

function getDatabaseUri() {
  const dbHost = process.env.DATABASE_HOST || "127.0.0.1";
  const dbPort = process.env.DATABASE_PORT || "27017";
  const dbName = process.env.DATABASE_NAME || "chat";

  return `mongodb://${dbHost}:${dbPort}/${dbName}`;
}

console.log("App Config".red);
console.log("PORT:".blue, PORT);
console.log("Database URI:".blue, getDatabaseUri());
console.log("---");

module.exports = {
  PORT,
  SOCKET_PORT,
  UI_PORT,
  CLIENT_URL,
  JWT_SIGN_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  getDatabaseUri,
};
