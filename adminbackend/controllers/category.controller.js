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

module.exports = {
  createCategory,
};
