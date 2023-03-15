const ServerModel = require("../model/server");
const { BadRequestError } = require("../utils/errors");

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
    const serverData = { name, ownerId, users: { userId: ownerId } };
    const server = new ServerModel(serverData);

    try {
      const newServer = await server.save(serverData);
      return { data: this.makePublicServer(newServer) };
    } catch (error) {
      console.error(error.message);
      return { error };
    }
  }

  static async getByUser(userId) {
    if (!userId) throw new BadRequestError("Missing userId");

    const filter = { "users.userId": userId };

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
        throw new BadRequestError("No server found");
      }
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  static async updateByUser() {}
  //   TODO: add user to server
  //   TODO: remove user from server
}
module.exports = Server;
