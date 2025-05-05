import axios from "axios";
import * as cheerio from "cheerio";
import { torAgent } from "./torAgent.js";

export const scrapeDarkDump = async () => {
  const onionUrl = "http://exampleonionlink.onion/leaks";
  try {
    const res = await axios.get(onionUrl, { httpAgent: torAgent, timeout: 15000 });
    const $ = cheerio.load(res.data);
    const leaks = [];

    $("pre").each((_, el) => {
      const text = $(el).text();
      leaks.push(text);
    });

    return leaks;
  } catch (err) {
    console.error("TOR scrape failed:", err.message);
    return [];
  }
};
