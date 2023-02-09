const UserModel = require("../models/user");

class User {
  static makePublicUser(userObject) {
    const { _id, githubId, googleId, username, createdAt, updatedAt } =
      userObject;
    return {
      id: _id,
      googleId,
      githubId,
      username,
      createdAt,
      updatedAt,
    };
  }

  static async create(data) {
    const user = new UserModel(data);

    try {
      const newUser = await user.save();

      return { data: newUser, error: null };
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    }
  }

  static async getAll() {
    const filter = {};

    try {
      const allUsers = await UserModel.find(filter);
      let allPublicUsers = [];

      // change key names and remove irrelevant/sensible keys
      allPublicUsers.forEach((userObject) => {
        allPublicUsers.push(this.makePublicRoom(userObject));
      });

      return { data: allPublicUsers, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: error };
    }
  }

  static async findById(id) {
    try {
      const user = await UserModel.findById(id);

      return { data: user, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: error };
    }
  }

  static async findOne(filter) {
    try {
      const user = await UserModel.findOne(filter);

      return user;
    } catch (error) {
      console.error(error);
      return { user: null, error: error };
    }
  }

  static async findBy(filter) {
    try {
      const users = await UserModel.find(filter);

      return { data: users, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: error };
    }
  }

  static async findByOrCreate(filter, data) {
    try {
      const user = await UserModel.findOne(filter);

      let newUser;
      if (!user) {
        newUser = await this.create(data);
      }

      return { data: user || newUser, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
}

module.exports = User;
