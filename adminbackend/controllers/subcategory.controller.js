const Subcategory = require("../Models/Subcategory");
const createSubcategory = async (req, res) => {
  try {
    const image = req.file.filename;

    const newSubcategory = new Subcategory({
      ...req.body,
      image,
    });

    // Save the new restaurant to the database
    const savedSubcategory = await newSubcategory.save();

    // Send a response back to the frontend indicating the success of the operation
    res.status(201).json({
      success: true,
      message: "The subcategory item  added successfully.",
      data: savedSubcategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "An error occurred while adding the subcategory.",
    });
  }
};

module.exports = {
  createSubcategory,
};
