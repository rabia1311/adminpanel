const Customer = require("../Models/Customer");
const createCustomer = async (req, res) => {
  try {
    const image = req.file.filename;

    const newCustomer = new Customer({
      ...req.body,
      image,
    });

    // Save the new restaurant to the database
    const savedCustomer = await newCustomer.save();

    // Send a response back to the frontend indicating the success of the operation
    res.status(201).json({
      success: true,
      message: "The user  added successfully.",
      data: savedCustomer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "An error occurred while adding the user.",
    });
  }
};

module.exports = {
  createCustomer,
};
