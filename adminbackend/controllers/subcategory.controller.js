const Subcategory = require("../Models/Subcategory");
const createSubcategory = async (req, res) => {
  try {
    const image = req.file?.filename;

    const newSubcategory = new Subcategory({
      ...req.body,

      image,
    });

    // Save the new subcategory to the database
    const savedSubcategory = await newSubcategory.save();

    // Send a response back to the frontend indicating the success of the operation
    res.status(201).json({
      success: true,
      message: "The subcategory item added successfully.",
      data: savedSubcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

const getSubCategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.find();
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategory" });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the restaurant by ID and delete it
    const deletedRestaurant = await Subcategory.findByIdAndDelete(id);

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

const updateSubcategory = async (req, res, next) => {
  const subcategoryId = req.params.id;
  const {
    Itemcategory,
    Itemname,
    Restaurantname,
    Itemprice,
    Discount,
    numberQ,
  } = req.body;

  Subcategory.findById(subcategoryId)
    .then((subcategory) => {
      if (!subcategory) {
        return res.status(404).json({ error: "Item  not found" });
      }

      subcategory.Itemcategory = Itemcategory;
      subcategory.Itemname = Itemname;
      subcategory.Restaurantname = Restaurantname;
      subcategory.Itemprice = Itemprice;
      subcategory.Discount = Discount;
      subcategory.numberQ = numberQ;
      if (req.file) {
        subcategory.image = req.file.filename;
      }
      return subcategory.save();
    })
    .then((updatedSubcategory) => {
      res.status(200).json({ updated_subcategory: updatedSubcategory });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "An error occurred while updating the item details ",
      });
    });
};
module.exports = {
  createSubcategory,
  getSubCategory,
  deleteRestaurant,
  updateSubcategory,
};
