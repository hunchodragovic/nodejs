const mongoose = require("mongoose");
const Article = require("./models/Article"); // Corrected path
require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

const seedArticle = async () => {
  await connectDB(); // Ensure the database is connected before inserting

  try {
    const article = new Article({
      title: "Test Article",
      content: "This is a test article content.",
      author: "John Doe",
    });

    await article.save();
    console.log("✅ Article added successfully!");

    mongoose.connection.close(); // Close connection after saving
  } catch (error) {
    console.error("❌ Error inserting article:", error);
  }
};

seedArticle();
