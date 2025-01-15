import { Server as SocketIOServer, Socket } from 'socket.io';
const { randomUUID } = require('crypto');
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
    socket.on("sendMessage", (data: { sender: string; text: string; providerId: string; userId: string, _id:string }) => {
      console.log("Message received:", data);
      io.emit("receiveMessage", data); // Broadcast message to all connected clients
    });
    
    socket.on("messageRead", (data: { messageId: string; readerId: string }) => {
      console.log(`Message ${data.messageId} was read by ${data.readerId}`);
      // Optionally, you can update your database to record that the message was read
      // For example: updateMessageStatus(data.messageId, data.readerId, "read");
  
      // Notify other participants about the read status
      io.emit("messageReadAck", data);
    });
  
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  
  return io;
};

export default initSocketIO;
