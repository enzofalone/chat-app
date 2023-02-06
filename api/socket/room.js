const createMessage = require("../utils/message");

function addRoomEvents(socket) {
    socket.on("join-room", (data, callback) => {
        console.log(data);

        socket.join(data.room);
        socket.leave(data.prevRoom);

        // Send callback message to the user creating the
        callback({
            username: "Server",
            text: "Successfully joined " + data.room + "!",
        });

        socket
            .to(data.prevRoom)
            .emit(
                "receive-message",
                createMessage(
                    socket.id,
                    data.prevRoom,
                    `${data.username || data.id} left ${data.prevRoom}`,
                    data.prevRoom
                )
            );

        socket
            .to(data.room)
            .emit(
                "receive-message",
                createMessage(
                    socket.id,
                    data.room,
                    `${data.username || data.id} joined ${data.room}`,
                    data.room
                )
            );

        console.log(socket.id, "joined", data.room);
    });
}

module.exports = addRoomEvents;
