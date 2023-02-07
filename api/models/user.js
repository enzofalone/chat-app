const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
            required: false,
        },
        githubId: {
            type: String,
            required: false,
        },
        username: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
