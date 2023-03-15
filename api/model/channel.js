const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    serverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Server',
      required: [true,"No server id in new channel"],
  },
  },
  {
    timestamps: true,
  }
);

const ChannelModel = mongoose.model("Channel", channelSchema);

module.exports = ChannelModel;
