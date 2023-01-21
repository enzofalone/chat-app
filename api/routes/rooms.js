const express = require("express");
const router = express.Router();
const Room = require("../controllers/room");

router.post("/", async (req, res) => {
    const { name } = req.body;

    const room = await Room.findBy({ name });

    if (room.error) {
        res.status(400).json(room.error);
    } else {
        const newRoom = await Room.create({ name });

        if (room.data) {
            res.status(201).json(room.data);
        } else {
            res.status(400).json(room.error);
        }
    }
});

router.get("/", async (req, res) => {
    const rooms = await Room.getAll();

    if (rooms.data) {
        res.status(200).json(rooms.data);
    } else {
        res.status(500).json(room.error);
    }
});

module.exports = router;
