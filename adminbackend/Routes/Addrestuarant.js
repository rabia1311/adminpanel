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

const {
  createRestaurant,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
} = require("../controllers/restaurant.controller");

router.post("/restaurant", upload.single("image"), createRestaurant);
router.get("/restaurant", getRestaurant);
router.delete("/restaurant/:id", deleteRestaurant);
router.put("/restaurant/:id", upload.single("image"), updateRestaurant);
module.exports = router;
