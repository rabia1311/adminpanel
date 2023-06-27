const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  Restaurant_name: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  DeliveryTime: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Restaurant_Address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
