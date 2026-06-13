const { UnauthorizedError } = require('../utils/errors');
const Server = require('../controllers/server');

// requires workspace ID, user ID
const isUserMember = async (req, res, next) => {
  const { workspaceId = id } = req.query;
  const userId = req.user._id;

  try {
    const workspaceList = await Server.getByUser(userId);

    if (!workspaceList.data.find((workspace) => workspace.id.toString() === workspaceId)) {
      throw new UnauthorizedError('User not authorized to create invite link');
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { isUserMember };
