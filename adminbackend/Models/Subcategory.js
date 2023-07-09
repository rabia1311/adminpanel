const mongoose = require("mongoose");
const subcategorySchema = new mongoose.Schema({
  Itemcategory: {
    type: String,
    required: true,
  },
  Itemname: {
    type: String,
    required: true,
  },
  Restaurantname: {
    type: String,
    required: true,
  },

  Itemprice: {
    type: String,
    required: true,
  },

  numberQ: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;
