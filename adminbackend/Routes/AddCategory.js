const express = require("express");
const multer = require("multer");
const router = express.Router();
const Category = require("../Models/Category");

// Storage
const storage = multer.diskStorage({
  destination: "category/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const {
  createCategory,
  getCategory,
  deleteRestaurant,
} = require("../controllers/category.controller");

router.post("/category", upload.single("image"), createCategory);
router.get("/category", getCategory);
router.delete("/category/:id", deleteRestaurant);

router.put("/category/:id", upload.single("image"), (req, res, next) => {
  const categoryId = req.params.id;
  const { CategoryType, CategoryName, Description } = req.body;

  Category.findById(categoryId)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      category.CategoryType = CategoryType;
      category.CategoryName = CategoryName;
      category.Description = Description;

      if (req.file) {
        category.image = req.file.filename;
      }

      return category.save();
    })
    .then((updatedCategory) => {
      res.status(200).json({ updated_category: updatedCategory });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the category" });
    });
});

router.get("/category/:id", (req, res, next) => {
  const categoryId = req.params.id;

  Category.findById(categoryId)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json({ category });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the category" });
    });
});

module.exports = router;
