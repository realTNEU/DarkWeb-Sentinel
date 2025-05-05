import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const checkLeakCheck = async (email) => {
  try {
    const res = await axios.get("https://leakcheck.io/api", {
      params: {
        key: process.env.LEAKCHECK_API_KEY,
        check: email,
        type: "email"
      }
    });

    if (res.data.success && res.data.found > 0) {
      return res.data.sources;
    } else {
      return [];
    }
  } catch (err) {
    console.error("LeakCheck API error:", err.message);
    return null;
  }
};
