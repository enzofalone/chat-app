function addMessageEvents(socket) {
    socket.on("send-message", (message) => {
        console.log(message.id, message.text);

        socket.to(message.room).emit("receive-message", {
            ...message,
            name: message.name || message.id,
        });
    });
}

module.exports = addMessageEvents;
