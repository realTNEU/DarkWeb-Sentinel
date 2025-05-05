import Identity from "../models/Identity.js";
import crypto from "crypto";
import axios from "axios";

export const addIdentity = async (req, res) => {
  const { type, raw } = req.body;

  if (!type || !raw) {
    return res.status(400).json({ msg: "Type and raw value are required" });
  }

  const hash = crypto.createHash("sha256").update(raw).digest("hex");

  try {
    const identity = new Identity({
      userId: req.user.id,
      type,
      raw,
      hash,
    });

    await identity.save();

    try {
      await axios.get("http://localhost:4000/run-scraper");
      console.log("[+] Scraper triggered after identity added.");
    } catch (scrapeErr) {
      console.warn("[-] Could not trigger scraper:", scrapeErr.message);
    }

    res.status(201).json({ msg: "Identity added", identity });
  } catch (err) {
    res.status(400).json({ msg: "Failed to add identity", error: err.message });
  }
};

export const getIdentities = async (req, res) => {
  try {
    const identities = await Identity.find({ userId: req.user.id });
    res.status(200).json({ identities });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching identities", error: err.message });
  }
};

export const deleteIdentity = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Identity.deleteOne({ _id: id, userId: req.user.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Identity not found" });
    }

    res.status(200).json({ msg: "Identity deleted" });
  } catch (err) {
    res.status(400).json({ msg: "Deletion failed", error: err.message });
  }
};
