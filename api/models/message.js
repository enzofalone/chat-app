const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    roomName: {
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
