const Category = require("../Models/Category");
const createCategory = async (req, res) => {
  try {
    const image = req.file?.filename;

    const newCategory = new Category({
      ...req.body,
      image,
    });
    // Save the new restaurant to the database
    const savedCategory = await newCategory.save();

    // Send a response back to the frontend indicating the success of the operation
    res.status(201).json({
      success: true,
      message: "Category  added successfully.",
      data: savedCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "An error occurred while adding the category.",
    });
  }
};
const getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restuarants" });
  }
};
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
module.exports = {
  createCategory,
  getCategory,
  deleteRestaurant,
};
