const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        username: {
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
