import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, "../public")));

// Serve the HTML file on the root route
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../public/location-api.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
