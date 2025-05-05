import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/leaks", (req, res) => {
  res.sendFile(path.join(__dirname, "leaks.html"));
});

const PORT = 4040;
app.listen(PORT, () => console.log(`Fake leaks server running at http://localhost:${PORT}/leaks`));
