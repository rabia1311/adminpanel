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

const getRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.find(); // Retrieve plain JavaScript objects instead of Mongoose documents

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};

//delete

const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the restaurant by ID and delete it
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    return res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the restaurant" });
  }
};

//update

const updateRestaurant = async (req, res, next) => {
  const restaurantId = req.params.id;
  const {
    Restaurant_name,

    DeliveryTime,
    Description,
    Restaurant_Address,
  } = req.body;

  // Check if the "Description" field is provided
  if (!Description) {
    return res.status(400).json({ error: "Description is required" });
  }

  Restaurant.findById(restaurantId)
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }

      restaurant.Restaurant_name = Restaurant_name;
      restaurant.DeliveryTime = DeliveryTime;
      restaurant.Description = Description;
      restaurant.Restaurant_Address = Restaurant_Address;

      if (req.file) {
        restaurant.image = req.file.filename;
      }

      return restaurant.save();
    })
    .then((updatedRestaurant) => {
      res.status(200).json({ updated_restaurant: updatedRestaurant });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the restaurant" });
    });
};

// Add other routes and controllers for creating, deleting, fetching restaurants, etc.

module.exports = {
  createRestaurant,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
};
