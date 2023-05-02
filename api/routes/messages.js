const express = require("express");
const Message = require("../controllers/message");
const router = express.Router();

/**
 * Create message based on JSON object containing: name, text, channelId
 */
router.post("/", async (req, res) => {
  const { name, text, channelId } = req.body;

  const newMessage = await Message.create(name, text, channelId);

  if (newMessage.data) {
    res.status(201).json(newMessage.data);
  } else {
    res.status(400).json(newMessage.error);
  }
});

/**
 * Get by channel ID
 */
router.get("/:channelId", async (req, res) => {
  const { channelId } = req.params;

  const messages = await Message.findByChannel(channelId);

  if (messages.data) {
    res.status(200).json(messages.data);
  } else {
    res.status(400).json(messages.error);
  }
});

/**
 * delete by message ID
 */
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
