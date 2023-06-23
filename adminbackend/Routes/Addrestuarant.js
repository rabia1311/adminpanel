const express = require('express');
const router = express.Router();
const Restaurant = require("../Models/Restuarant");

router.post('/restaurants', async (req, res) => {
  try {
    const { Restaurant_name, Category, DeliveryTime, Description, Restaurant_Address, image } = req.body;

    // Create a new instance of the Restaurant model with the form data
    const newRestaurant = new Restaurant({
      Restaurant_name,
      Category,
      DeliveryTime,
      Description,
      Restaurant_Address,
      image
    });

    // Save the new restaurant to the database
    const savedRestaurant = await newRestaurant.save();

    // Send a response back to the frontend indicating the success of the operation
    res.status(201).json({ success: true, message: 'Restaurant added successfully.', data: savedRestaurant });
  } catch (error) {
    res.status(500).json({ success: false, error: 'An error occurred while adding the restaurant.' });
  }
});

module.exports = router;
