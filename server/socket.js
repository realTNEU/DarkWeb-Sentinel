import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("🔌 New client connected");

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected");
    });
  });
};

export const emitAlert = (userId, alertData) => {
  if (io) {
    io.emit(`alert:${userId}`, alertData);
  }
};
