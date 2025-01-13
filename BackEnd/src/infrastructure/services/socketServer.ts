import { Server as SocketIOServer, Socket } from 'socket.io';

import { Server as HttpServer } from "http";

const initSocketIO = (httpServer: HttpServer): SocketIOServer => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: true, 
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true, // Allow cookies

    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // Event listener for "sendMessage"
    socket.on("sendMessage", (data: { sender: string; text: string; providerId: string; userId: string }) => {
      console.log("Message received:", data);
      io.emit("receiveMessage", data); // Broadcast message to all connected clients
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  
  return io;
};

export default initSocketIO;
