const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");

const socketHandlers = require("./socketHandlers");

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

socketHandlers(io);

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
