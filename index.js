const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();

const server = http.createServer(app);

const router = require("./router");
app.use(router);

const io = socketIO(server);

io.on("connection", function (socket) {
  console.log("Connection established!");

  socket.on("newChatMessage", (data) => {
    io.emit("newChatMessage", data);
  });

  socket.on("disconnect", function () {
    console.log("Disconnected!");
  });
});

server.listen(process.env.PORT || 7000, () =>
  console.log(`Server is running.`)
);
