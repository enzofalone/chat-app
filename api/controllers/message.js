const MessageModel = require("../models/message");
const { parseMessage } = require("../utils/message");
class Message {
  static makePublic(id, name, text, roomId) {
    return {
      id,
      name,
      text,
      roomId,
    };
  }

  // server messages don't need a callback
  static async createServerMessage(data) {
    const message = new MessageModel(data);

    // store in database and return it to the user
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

  static async create(data) {
    const message = new MessageModel(data);

    const isProfanity = await this.#checkProfanity(data.text);

    if (isProfanity) {
      return { data: null, error: "contains profanity" };
    }

    // store in database and return it to the user
    try {
      const newMessage = await message.save();
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

  static async findByRoom(roomName, page) {
    const filter = { roomName };
    const perPage = 25;
    const skip = perPage * (page - 1);

    let parsedMessages = [];

    try {
      // fetch messages, sort by chronological order
      const messages = await MessageModel.find(filter)
        .sort({ createdAt: 1 })

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

  static async #checkProfanity(text) {
    let profanityArray = [];

    const module = await import("@coffeeandfun/google-profanity-words");
    const profanity = new module.ProfanityEngine();

    profanityArray = profanity.all();

    for (let i = 0; i < profanityArray.length; i++) {
      if (text.includes(profanityArray[i])) {
        return true;
      }
    }
    return false;
  }
}

module.exports = Message;
