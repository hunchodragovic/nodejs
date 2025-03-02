const mongoose = require("mongoose");

// Define the Article schema
const ArticleSchema = new mongoose.Schema({
  title: {
    type: String, // The title of the article
    required: true, // This field is required
    trim: true, // Removes extra spaces from both ends
  },
  content: {
    type: String, // The main content of the article
    required: true, // Must be provided
  },
  author: {
    type: String, // Name of the article's author
    required: true, // Must be provided
  },
  createdAt: {
    type: Date, // Date when the article was created
    default: Date.now, // Default value is the current time
  },
});

// Create a Mongoose model based on the schema
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article; // Export the model for use in other files
