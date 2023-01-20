const mongoose = require("mongoose");
const { getDatabaseUri } = require("./config");

mongoose.set("strictQuery", false);
mongoose.connect(getDatabaseUri(), { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", (error) => {
    console.log("--------");
    console.log("Database error".red);
    console.error(error);
});

db.once("open", () => console.log(`Connected succesfully to database!`.green));

module.exports = db;
