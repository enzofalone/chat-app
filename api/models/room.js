const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    connections: {
        type: [
            {
                username: String,
                socketId: String,
            },
        ],
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const roomModel = mongoose.model("Room", roomSchema);

module.exports = roomModel;
