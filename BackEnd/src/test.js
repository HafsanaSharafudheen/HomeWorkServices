"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var server = (0, http_1.createServer)();
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173", // Replace with your frontend URL
        methods: ["GET", "POST"],
        credentials: true,
    },
});
io.on('connection', function (socket) {
    console.log('User connected:', socket.id);
});
server.listen(3000, function () {
    console.log('Server running on http://localhost:3000');
});
