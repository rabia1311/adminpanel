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
const Restaurant = require("../Models/Restuarant");

router.post("/restaurant", upload.single("image"), createRestaurant);
router.get("/restaurant", getRestaurant);
router.delete("/restaurant/:id", deleteRestaurant);
router.put("/restaurant/:id", upload.single("image"), updateRestaurant);

router.get("/restaurant/:id", (req, res, next) => {
  const categoryId = req.params.id;

  Restaurant.findById(categoryId)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ error: "Restaurant not found" });
      }

      res.status(200).json({ category });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the restaurant " });
    });
});
module.exports = router;
