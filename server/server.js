const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");

const socketHandlers = require("./socketHandlers");

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

// Setup Socket.IO with CORS support for the client
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "https://bldr-eight.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Attach Socket.IO handlers
socketHandlers(io);

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
