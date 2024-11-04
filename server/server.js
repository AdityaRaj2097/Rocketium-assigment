
const { Server } = require("socket.io");
const { setupSocketHandlers } = require("./controller/socketService");

const PORT = 3001;
const io = new Server(PORT, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

console.log(`Socket.IO server is running on http://localhost:${PORT}`);

setupSocketHandlers(io);
