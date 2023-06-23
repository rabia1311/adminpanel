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

// const upload = multer({ dest: "public/files" });

const { createRestaurant } = require("../controllers/restaurant.controller");

router.post("/restaurant", upload.single("image"), createRestaurant);

module.exports = router;
