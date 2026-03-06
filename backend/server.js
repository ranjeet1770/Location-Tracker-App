const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  socket.on("send-location", (data) => {

    console.log("Location received:", data);

    io.emit("receive-location", data);

  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});