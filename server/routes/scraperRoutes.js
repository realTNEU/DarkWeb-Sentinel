import express from "express";
import User from "../models/User.js";
import Identity from "../models/Identity.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    const full = [];

    for (const user of users) {
      const identities = await Identity.find({ userId: user._id });
      full.push({ _id: user._id, identities });
    }

    res.status(200).json({ users: full });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch users", error: err.message });
  }
});

export default router;
