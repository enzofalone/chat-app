const ChannelModel = require("../model/channel");
const ServerModel = require("../model/server");
const { BadRequestError } = require("../utils/errors");
const { parseObjectId } = require("../utils/parse");
class Channel {
  static makePublicChannel(channelObject) {
    const { _id, name, serverId, createdAt, updatedAt } = channelObject;
    return {
      id: _id,
      name,
      serverId,
      createdAt,
      updatedAt,
    };
  }

  static async isNameDuplicate(serverId, channelName) {
    const filter = { name: channelName, serverId };
    const channel = await ChannelModel.findOne(filter);

    return channel;
  }

  static async create(serverId, channelName) {
    const newChannelData = { name: channelName, serverId };

    const isDuplicateName = await this.isNameDuplicate(serverId, channelName);

    if (isDuplicateName) {
      throw new BadRequestError("Duplicate channel name within server");
    }

    try {
      const channel = new ChannelModel(newChannelData);
      const savedChannel = await channel.save();

      return { data: this.makePublicChannel(savedChannel) };
    } catch (error) {
      console.error(error.message);
      return { error };
    }
  }

  static async findByServer(serverId) {
    try {
      const channelList = await ChannelModel.find({ serverId });

      const parsedChannelList = [];

      channelList.forEach((channel) => {
        let parsedChannel = this.makePublicChannel(channel);
        parsedChannelList.push(parsedChannel);
      });

      return { data: parsedChannelList, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: error };
    }
  }

  static async findBy(filter) {
    try {
      const channels = await ChannelModel.find(filter);

      channels.map((channel) => this.makePublicChannel(channel));

      return { data: channels, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: error };
    }
  }

  static async delete(id) {
    try {
      const deletedChannel = await ChannelModel.deleteOne({ _id: id });

      return { data: this.makePublicChannel(deletedChannel) };
    } catch (error) {
      console.error(error);
      return { data: null, error: error };
    }
  }
}
module.exports = Channel;
