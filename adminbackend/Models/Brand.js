const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema({
  brandname: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});
const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
