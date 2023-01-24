const express = require("express");
const router = express.Router();
const Room = require("../controllers/room");

router.post("/", async (req, res) => {
    const { name } = req.body;

    const newRoom = await Room.create({ name });

    if (newRoom.data) {
        res.status(201).json(newRoom.data);
    } else {
        res.status(400).json(newRoom.error);
    }
});

router.get("/", async (req, res) => {
    const rooms = await Room.getAll();

    if (rooms.data) {
        res.status(200).json(rooms.data);
    } else {
        res.status(500).json(rooms.error);
    }
});

module.exports = router;
