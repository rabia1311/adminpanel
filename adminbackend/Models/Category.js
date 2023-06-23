const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  Category_Type: {
    type: String,
    required: true,
  },
  Category_Name: {
    type: Number,
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
