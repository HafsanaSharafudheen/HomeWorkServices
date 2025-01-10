import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

// Initialize Socket.IO Server
const initSocketIO = (httpServer: HttpServer): Server => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
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