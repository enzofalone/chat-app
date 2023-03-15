const express = require("express");
const router = express.Router();
const Channel = require("../controllers/channel");

router.post("/", async (req, res, next) => {
  const { serverId, channelName } = req.body;

  try {
    const newChannel = await Channel.create(serverId, channelName);

    if (newChannel.data) {
      res.status(201).json(newChannel.data);
    } else {
      res.status(400).json(newChannel.error);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  const { serverId } = req.query;

  try {
    const channels = await Channel.findByServer(serverId);

    if (channels.data) {
      res.status(200).json(channels.data);
    } else {
      res.status(500).json(channels.error);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
