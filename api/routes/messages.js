const express = require("express");
const Message = require("../controllers/message");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, text, roomId } = req.body;

  const newMessage = await Message.create({ name, text, roomId });

  if (newMessage.data) {
    res.status(201).json(newMessage.data);
  } else {
    res.status(400).json(newMessage.error);
  }
});

router.get("/:roomId", async (req, res) => {
  const { roomId } = req.params;

  const messages = await Message.findByRoom(roomId);

  if (messages.data) {
    res.status(200).json(messages.data);
  } else {
    res.status(400).json(messages.error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deletedMessage = await Message.delete(id);

  if (deletedMessage.data) {
    res.status(201).json(deletedMessage.data);
  } else {
    res.status(400).json(deletedMessage.error);
  }
});

module.exports = router;
