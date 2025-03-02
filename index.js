const express = require("express");
const connectDB = require("./db"); // Import the database connection function

const app = express();
const port = 3000;

// Connect to MongoDB before starting the server
connectDB()
  .then(() => {
    console.log("✅ Database connected successfully!");

    // Start the server only after a successful database connection
    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1); // Stop the app if the database connection fails
  });

// Set EJS as the template engine
app.set("view engine", "ejs");

// Serve static files (CSS, images, etc.)
app.use(express.static("public"));

// Dynamic route rendering EJS template
app.get("/", (req, res) => {
  res.render("index", { username: "John Doe" });
});
