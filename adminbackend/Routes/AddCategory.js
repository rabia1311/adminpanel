const express = require("express");
const multer = require("multer");
const router = express.Router();

//storage

const Storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
});
const { createCategory } = require("../controllers/category.controller");
router.post("/category", upload.single("image"), createCategory);

module.exports = router;
