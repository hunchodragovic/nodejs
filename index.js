const express = require("express");
const connectDB = require("./db");
const Article = require("./models/Article"); // Import the Article model
const bodyParser = require("express"); // Middleware to handle form data

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data

connectDB()
  .then(() => {
    console.log("✅ Database connected successfully!");

    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  });

// Home route
app.get("/", (req, res) => {
  res.render("index", { username: "John Doe" });
});

// Display all articles
app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find(); // Fetch all articles from MongoDB
    res.render("articles", { articles }); // Pass articles to the EJS view
  } catch (error) {
    res.status(500).send("Error fetching articles");
  }
});

// Handle article submission
app.post("/articles", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const newArticle = new Article({
      title,
      content,
      author,
    });

    await newArticle.save();
    res.redirect("/articles"); // Redirect to the articles page after saving
  } catch (error) {
    res.status(500).send("Error saving article");
  }
});
