const express = require("express");
const router = express.Router();
const Server = require("../controllers/server");
const { BadRequestError } = require("../utils/errors");

router.post("/", async (req, res) => {
  const { serverName } = req.body;
  const { _id } = req.user;

  if(!_id || !serverName){
    throw new BadRequestError("No user id/server name found")
  }

  const newServer = await Server.create(serverName, _id);

  if (newServer.data) {
    res.status(201).json(newServer.data);
  } else {
    res.status(400).json(newServer.error);
  }
});

router.get("/", async (req, res) => {
  try {
    const serverList = await Server.getByUser(req.user._id);

    if (serverList.data) {
      res.status(200).json(serverList.data);
    } else {
      res.status(500).json(serverList.error);
    }
  } catch (error) {
    console.error(error);
    return error;
  }
});

// crud for channels

module.exports = router;
