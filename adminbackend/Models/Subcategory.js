const mongoose = require("mongoose");
const subcategorySchema = new mongoose.Schema({
  Itemname: {
    type: String,
    required: true,
  },
  Itemprice: {
    type: String,
    required: true,
  },
  Discount: {
    type: String,
    required: true,
  },
  numberQ: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;
