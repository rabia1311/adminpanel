const Category = require("../Models/Category");

const createCategory = async (req, res) => {
  try {
    const image = req.file.filename;
    const newCategory = new Category({
      ...req.body,
      image,
    });
    const savedCategory = await newCategory.save();
    res.status(201).json({
      success: true,
      message: "Category added successfully.",
      data: savedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add category.",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
};
