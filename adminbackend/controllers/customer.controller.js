const Customer = require("../Models/Customer");
const createCustomer = async (req, res) => {
  try {
    const image = req.file?.filename;

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
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};
const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.find();
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch User" });
  }
};

module.exports = {
  createCustomer,
  getCustomer,
};
