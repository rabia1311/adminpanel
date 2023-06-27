const Restaurant = require("../Models/Restuarant");

const createRestaurant = async (req, res) => {
  try {
    const image = req.file?.filename;
    // const {
    //   Restaurant_name,
    //   Category,
    //   DeliveryTime,
    //   Description,
    //   Restaurant_Address,

    // } = req.body;

    // Create a new instance of the Restaurant model with the form data
    const newRestaurant = new Restaurant({
      ...req.body,
      image,
    });

    // Save the new restaurant to the database
    const savedRestaurant = await newRestaurant.save();

    // Send a response back to the frontend indicating the success of the operation
    res.status(201).json({
      success: true,
      message: "Restaurant added successfully.",
      data: savedRestaurant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "An error occurred while adding the restaurant.",
    });
  }
};

module.exports = {
  createRestaurant,
};