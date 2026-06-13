const ServerModel = require('../model/server');
const { BadRequestError } = require('../utils/errors');
const Channel = require('../controllers/channel');
const { generateToken } = require('../utils/token');
const { CLIENT_URL } = require('../config');
const { hashPayload } = require('../utils/sqid');
class Server {
  static makePublicServer(server) {
    const { _id, name, ownerId, updatedAt, createdAt, users, channels } =
      server;

    return {
      id: _id,
      name,
      ownerId,
      updatedAt,
      createdAt,
      users,
      channels,
    };
  }

  static async create(name, ownerId) {
    const serverData = { name, ownerId, users: [ownerId] };
    const server = new ServerModel(serverData);

    try {
      const newServer = await server.save(serverData);

      // create default "general" channel
      await Channel.create(newServer._id, 'general');
      return { data: this.makePublicServer(newServer) };
    } catch (error) {
      console.error(error.message);
      return { error };
    }
  }

  /**
   *
   * @param {string} workspaceId
   * @param {string} userId
   * @returns success/failure
   */
  static async joinServer(workspaceId, userId) {
    try {
      const res = await ServerModel.updateOne(
        { _id: workspaceId },
        { $push: { users: userId } }
      );
      console.log(res)
      return res
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  static async deleteServer(serverId) {
    try {
      await ServerModel.deleteOne({ _id: serverId });
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  static async getByUser(userId) {
    if (!userId) throw new BadRequestError('Missing userId');

    const filter = { users: userId };

    try {
      const serverList = await ServerModel.find(filter);

      // make all objects appropiate for client
      let parsedServerList = serverList.map((server) =>
        this.makePublicServer(server)
      );

      return { data: parsedServerList };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  static async deleteByUser(serverId, userId) {
    try {
      // const server = ServerModel.findById(serverId);

      // if (server && server.ownerId === userId) {
      //   server.delete();
      // }
      const deletedServer = ServerModel.findOneAndDelete({
        ownerId: parseObjectId(userId),
      });

      if (deletedServer.length) {
        return { data: this.makePublicServer(deletedServer) };
      } else {
        throw new BadRequestError('No server found');
      }
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  static async updateByUser() {}
  //   TODO: remove user from server

  /**
   * @param {string} workspaceId
   * @returns signed token for (12h) which will allow any user to join other user's servers
   */
  static async createInviteLink(workspaceId) {
    if (!workspaceId) throw new BadRequestError('No workspace ID');

    const token = await hashPayload(workspaceId);
    console.log(token)
    return token;
  }
}
module.exports = Server;
