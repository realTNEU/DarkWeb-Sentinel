import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import identityRoutes from "./routes/identityRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import scraperRoutes from "./routes/scraperRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});
app.set("io", io);

app.use("/api/auth", authRoutes);
app.use("/api/identities", identityRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/scraper", scraperRoutes);

app.get("/", (req, res) => {
  res.send("DarkWeb Sentinel Backend Running");
});

io.on("connection", (socket) => {
  console.log("🔌 Socket connected");

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
