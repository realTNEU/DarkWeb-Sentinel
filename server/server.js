import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import identityRoutes from "./routes/identityRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import scraperRoutes from "./routes/scraperRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Create HTTP + Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // adjust for production
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Make io accessible to all routes
app.set("io", io);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/identities", identityRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/scraper", scraperRoutes);

// Root
app.get("/", (req, res) => {
  res.send("DarkWeb Sentinel Backend Running");
});

// Socket events
io.on("connection", (socket) => {
  console.log("🔌 Socket connected");

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
