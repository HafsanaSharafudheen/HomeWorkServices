"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const { randomUUID } = require('crypto');
const initSocketIO = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: true,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            credentials: true, // Allow cookies
        },
    });
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);
        // Event listener for "sendMessage"
        socket.on("sendMessage", (data) => {
            console.log("Message received:", data);
            io.emit("receiveMessage", data); // Broadcast message to all connected clients
        });
        socket.on("messageRead", (data) => {
            console.log(`Message ${data.messageId} was read by ${data.readerId}`);
            // Optionally, you can update your database to record that the message was read
            // For example: updateMessageStatus(data.messageId, data.readerId, "read");
            // Notify other participants about the read status
            io.emit("messageReadAck", data);
        });
        socket.on("messageReadByP2P", (data) => {
            console.log(`All Messages by ${data.sender} was read by ${data.receiver}`);
            // Optionally, you can update your database to record that the message was read
            // For example: updateMessageStatus(data.messageId, data.readerId, "read");
            // Notify other participants about the read status
            io.emit("messageReadByP2PAck", data);
        });
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
    return io;
};
exports.default = initSocketIO;
//# sourceMappingURL=socketServer.js.map