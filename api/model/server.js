const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "No name found in new Server"],
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "No owner user id found"],
    },
    users: {
      type: [
        {
          userId: mongoose.Schema.Types.ObjectId,
        },
      ],
      required: [true, "No user found in users"],
      ref: "User",
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

const ServerModel = mongoose.model("Server", serverSchema);

module.exports = ServerModel;
