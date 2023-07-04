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

const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the restaurant by ID and delete it
    const deletedRestaurant = await Customer.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    return res.json({ message: "SubCategory deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the restaurant" });
  }
};

const updateCustomer = async (req, res, next) => {
  const customerId = req.params.id;
  const { name, email, phone, address } = req.body;

  Customer.findById(customerId)
    .then((customer) => {
      if (!customer) {
        return res.status(404).json({ error: "Customer  not found" });
      }
      customer.name = name;
      customer.email = email;
      customer.phone = phone;
      customer.address = address;
      if (req.file) {
        customer.image = req.file.filename;
      }
      return customer.save();
    })

    .then((updatedCustomer) => {
      res.status(200).json({ updated_customer: updatedCustomer });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({
          error: "An error occurred while updating the customer details ",
        });
    });
};

module.exports = {
  createCustomer,
  getCustomer,
  deleteRestaurant,
  updateCustomer,
};
