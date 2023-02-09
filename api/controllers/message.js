const MessageModel = require("../models/message");
const { parseMessage } = require("../utils/message");

class Message {
  static makePublic(id, name, text, room) {
    return {
      id,
      name,
      text,
      roomId,
    };
  }

  static async create(data) {
    const message = new MessageModel(data);

    try {
      const newMessage = await message.save();

      // we don't return anything as we directly broadcast messages
      // to users connected in the room
      return { data: newMessage, error: null };
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    }
  }

  static async delete(id) {
    try {
      const deletedMessage = await MessageModel.deleteOne({ _id: id });

      return { data: deletedMessage, error: null };
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    }
  }

  static async findByRoom(roomName) {
    const filter = { roomName };

    let parsedMessages = [];

    try {
      // fetch messages, sort by chronological order
      const messages = await MessageModel.find(filter).sort({ date: -1 });
      
      // parse JSON to JavaScript objects
      messages.forEach((message, index) => {
        parsedMessages.push(parseMessage(message));
      });

      return { data: parsedMessages, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: error };
    }
  }

  static async findById(id) {
    try {
      const message = await MessageModel.findById(id);

      return { data: message, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: error };
    }
  }
}

module.exports = Message;
