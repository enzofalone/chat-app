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
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
