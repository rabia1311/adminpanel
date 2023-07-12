const Brand = require("../Models/Brand");
const createBrand = async (req, res) => {
  try {
    const image = req.file?.filename;

    const newBrand = new Brand({
      ...req.body,
      image,
    });
    const savedBrand = await newBrand.save();
    // Send a response back to the frontend indicating the success of the operation
    res.status(201).json({
      success: true,
      message: "The Brand  added successfully.",
      data: savedBrand,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};
const getBrand = async (req, res) => {
  try {
    const brand = await Brand.find();
    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Brand" }, error);
  }
};
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the restaurant by ID and delete it
    const deletedBrand = await Brand.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    return res.json({ message: "Brand deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the Brand" });
  }
};

const updateBrand = async (req, res, next) => {
  const brandId = req.params._id;
  const { brandname, time } = req.body;

  Brand.findById(brandId)
    .then((brand) => {
      if (!brand) {
        return res.status(404).json({ error: "brand  not found" });
      }
      brand.brandname = brandname;

      brand.time = time;
      if (req.file) {
        brand.image = req.file.filename;
      }
      return brand.save();
    })

    .then((updatedBrand) => {
      res.status(200).json({ updated_brand: updatedBrand });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "An error occurred while updating the brand details ",
      });
    });
};
module.exports = {
  createBrand,
  getBrand,
  deleteBrand,
  updateBrand,
};
