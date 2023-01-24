const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        roomId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
