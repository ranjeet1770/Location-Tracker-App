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

  console.log("User connected:", socket.id)

  socket.on("send-location", (data) => {

    io.emit("receive-location", {
      id: socket.id,
      ...data
    })

  })

  socket.on("disconnect", () => {

    console.log("User disconnected:", socket.id)

    io.emit("user-disconnected", socket.id)

  })

})

server.listen(5000, () => {
  console.log("Server running on port 5000");
});