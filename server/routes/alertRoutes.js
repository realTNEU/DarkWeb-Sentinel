import express from "express";
import auth from "../middleware/authMiddleware.js";
import { reportAlert, getUserAlerts } from "../controllers/alertController.js";

const router = express.Router();

router.post("/report", (req, res, next) => {
  req.io = req.app.get("io"); // Attach io instance to req
  next();
}, reportAlert);

router.get("/my", auth, getUserAlerts);

export default router;
