const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  CategoryType: {
    type: String,
    required: true,
  },
  CategoryName: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
