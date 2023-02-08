const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    // TODO: store connections
    // connections: {
    //     type: [
    //         {
    //             username: String,
    //             socketId: String,
    //         },
    //     ],
    // },
  },
  {
    timestamps: true,
  }
);

const roomModel = mongoose.model("Room", roomSchema);

module.exports = roomModel;
