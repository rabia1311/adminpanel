const express = require("express");
const multer = require("multer");
const router = express.Router();
//storage
const Storage = multer.diskStorage({
  destination: "subcategoryimg/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
});

const {
  createSubcategory,
  getSubCategory,
  deleteRestaurant,
  updateSubcategory,
} = require("../controllers/subcategory.controller");
const Subcategory = require("../Models/Subcategory");

router.post("/subcategory", upload.single("image"), createSubcategory);
router.get("/subcategory", getSubCategory);
router.delete("/subcategory/:id", deleteRestaurant);
router.put("/subcategory/:id", upload.single("image"), updateSubcategory);

router.get("/subcategory/:id", (req, res, next) => {
  const categoryId = req.params.id;

  Subcategory.findById(categoryId)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ error: "SubCategory not found" });
      }

      res.status(200).json({ category });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the Subcategory" });
    });
});

module.exports = router;
