const RoomModel = require("../models/room");

class Room {
    static makePublicRoom(roomObject) {
        const { _id, name, createdAt, updatedAt } = roomObject;
        return {
            id: _id,
            title: name,
            createdAt,
            updatedAt,
        };
    }

    static async create(data) {
        const room = new RoomModel(data);

        try {
            const newRoom = await room.save();

            return { data: newRoom, error: null };
        } catch (error) {
            console.error(error.message);
            return { error: error.message };
        }
    }

    static async getAll() {
        const filter = {};

        try {
            const allRooms = await RoomModel.find(filter);
            let allPublicRooms = [];

            // change key names and remove irrelevant/sensible keys
            allRooms.forEach((roomObject) => {
                allPublicRooms.push(this.makePublicRoom(roomObject));
            });

            return { data: allPublicRooms, error: null };
        } catch (error) {
            console.error(error);
            return { data: null, error: error };
        }
    }

    static async findById(id) {
        try {
            const room = await RoomModel.findById(id);

            return { data: room, error: null };
        } catch (error) {
            console.error(error);
            return { data: null, error: error };
        }
    }

    static async findBy(filter) {
        try {
            const rooms = await RoomModel.find(filter);

            return { data: rooms, error: null };
        } catch (error) {
            console.error(error);
            return { data: null, error: error };
        }
    }
}

module.exports = Room;
