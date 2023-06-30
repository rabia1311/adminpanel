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
} = require("../controllers/subcategory.controller");

router.post("/subcategory", upload.single("image"), createSubcategory);
router.get("/subcategory", getSubCategory);
router.delete("/subcategory/:id", deleteRestaurant);

module.exports = router;
