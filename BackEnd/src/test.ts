import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const server = createServer();

const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
