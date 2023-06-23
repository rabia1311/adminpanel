const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  Restaurant_name: {
    type: String,
    required: true
  },
  Category: {
    type: String,
    required: true
  },
  DeliveryTime: {
    type: Number,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
 Restaurant_Address: {
    type: String,
    required: true
  },
  image:{
data:Buffer,
contentType: String
  }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
