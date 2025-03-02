const express = require("express");
const app = express();
const port = 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");

// Serve static files (CSS, images, etc.)
app.use(express.static("public"));

// Dynamic route rendering EJS template
app.get("/", (req, res) => {
  res.render("index", { username: "John Doe" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
