const express = require("express");
const Message = require("../controllers/message");
const router = express.Router();
const { BadRequestError } = require("../utils/errors");

/**
 * Create message based on JSON object containing: name, text, channelId
 */
router.post("/", async (req, res, next) => {
  const { name, text, channelId } = req.body;
  try {
    const newMessage = await Message.create(name, text, channelId);

    if (newMessage.data) {
      res.status(201).json(newMessage.data);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * Get by channel ID
 */
router.get("/:channelId", async (req, res, next) => {
  const { channelId } = req.params;
  try {
    const messages = await Message.findByChannel(channelId);

    if (messages.data) {
      res.status(200).json(messages.data);
    } else {
      res.status(400).json(messages.error);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * delete by message ID
 */
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedMessage = await Message.delete(id);

    if (deletedMessage.data) {
      res.status(201).json(deletedMessage.data);
    } else {
      res.status(400).json(deletedMessage.error);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
