const express = require('express');
const router = express.Router();
const Server = require('../controllers/server');
const { BadRequestError, UnauthorizedError } = require('../utils/errors');
const { CLIENT_URL } = require('../config');
const { isUserMember } = require('../middleware/permissions');

router.post('/', async (req, res, next) => {
  const { serverName } = req.body;
  const userId = req.user._id;
  try {
    console.log(userId, serverName);
    if (!userId || !serverName)
      throw new BadRequestError('No user id/server name found');

    const newServer = await Server.create(serverName, userId);

    if (newServer.data) {
      res.status(201).json(newServer.data);
    } else {
      res.status(400).json(newServer.error);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  const userId = req.user._id;

  try {
    if (!userId) throw new BadRequestError('No user Id');
    const serverList = await Server.getByUser(userId);

    if (serverList.data) {
      res.status(200).json(serverList.data);
    } else {
      res.status(500).json(serverList.error);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/join/generate', isUserMember, async (req, res, next) => {
  const { workspaceId } = req.query;

  try {
    const hash = await Server.createInviteLink(workspaceId);
    res.status(200).json({ hash });
  } catch (error) {
    next(error);
  }
});

router.get('/join/:workspaceId', async (req, res, next) => {
  const { workspaceId } = req.params;
  const userId = req.user._id;

  try {
    if (!workspaceId || !userId) {
      res.redirect(CLIENT_URL);
      throw new BadRequestError('Missing workspace ID/Missing user ID');
    }

    const response = await Server.joinServer(workspaceId, userId);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
