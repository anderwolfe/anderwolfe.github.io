const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve everything in the current folder
app.use(express.static(path.join(__dirname)));

// Fallback: if someone goes to "/", serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Gallery running at http://localhost:${PORT}`);
});
