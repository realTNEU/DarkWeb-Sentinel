import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  addIdentity,
  getIdentities,
  deleteIdentity,
} from "../controllers/identityController.js";

const router = express.Router();

router.post("/add", auth, addIdentity);
router.get("/list", auth, getIdentities);
router.delete("/delete/:id", auth, deleteIdentity);

export default router;
