import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";
import fs from "fs";
import path from "path";
import cron from "node-cron";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";
import cors from "cors";
import { checkLeakCheck } from "./sources/leakcheck.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const identitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["email", "phone", "username"],
      required: true,
    },
    raw: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Identity = mongoose.model("Identity", identitySchema);
mongoose
  .connect(process.env.MONGO_URI, { dbName: "darkwebsentinel" })
  .then(() => console.log("✅ Scraper DB connected"))
  .catch((err) => console.error("❌ Mongo error:", err));
const extractLeaks = () => {
  const htmlPath = path.join(__dirname, "leaks.html");
  const content = fs.readFileSync(htmlPath, "utf-8");
  const $ = cheerio.load(content);
  const leaks = [];
  $("pre").each((_, el) => {
    const text = $(el).text();
    leaks.push(text);
  });
  return leaks;
};
const reportAlert = async (userId, identityType, value) => {
  try {
    console.log(`🔔 Reporting alert for ${value}`);
    await axios.post(process.env.MAIN_API, {
      userId,
      identityType,
      value,
      source: "SimulatedLeakSite",
    });
    console.log(`[+] Alert successfully sent for ${value}`);
  } catch (err) {
    console.error("[-] Failed to report alert:", err.message);
  }
};
const runScraper = async () => {
  console.log("[*] Starting scraper...");
  const leaks = extractLeaks();
  const identities = await Identity.find();
  console.log(`🔍 Checking ${identities.length} identities...`);
  for (const identity of identities) {
    console.log(`🔎 Identity: ${identity.type} → ${identity.raw}`);
    for (const dump of leaks) {
      if (dump.includes(identity.raw)) {
        console.log(`✅ Match in local leaks: ${identity.raw}`);
        await reportAlert(
          identity.userId,
          identity.type,
          identity.raw,
          "SimulatedLeakSite"
        );
        break;
      }
    }
    if (identity.type === "email") {
      const sources = await checkLeakCheck(identity.raw);
      if (sources && sources.length > 0) {
        console.log(
          `🔥 LeakCheck match for ${identity.raw}: ${sources.join(", ")}`
        );
        for (const source of sources) {
          await reportAlert(
            identity.userId,
            identity.type,
            identity.raw,
            `LeakCheck - ${source}`
          );
        }
      } else {
        console.log(`❌ LeakCheck found nothing for ${identity.raw}`);
      }
    }
  }
  console.log("[✔] Scraper finished.");
};
app.post("/test-alert", async (_, res) => {
  const identities = await Identity.find();
  if (!identities.length) {
    return res.status(404).json({ msg: "No identities in DB" });
  }
  try {
    await reportAlert(
      identities[0].userId,
      identities[0].type,
      identities[0].raw
    );
    res.status(200).json({ msg: "Test alert sent" });
  } catch (err) {
    res.status(500).json({ msg: "Test alert failed", error: err.message });
  }
});
app.get("/run-scraper", async (_, res) => {
  await runScraper();
  res.json({ msg: "Scraper finished" });
});
app.get("/", (_, res) => {
  res.send("Scraper running...");
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Scraper listening on port ${PORT}`);
});
cron.schedule("*/5 * * * *", runScraper);
