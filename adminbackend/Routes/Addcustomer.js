const express = require("express");
const multer = require("multer");
const router = express.Router();
//storage
const Storage = multer.diskStorage({
  destination: "customerImg/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
});
const {
  createCustomer,
  getCustomer,
  deleteRestaurant,
  updateCustomer,
} = require("../controllers/customer.controller");
const Customer = require("../Models/Customer");

router.post("/customer", upload.single("image"), createCustomer);
router.get("/customer", getCustomer);
router.delete("/customer/:id", deleteRestaurant);
router.put("/customer/:id", upload.single("image"), updateCustomer);

router.get("/customer/:id", (req, res, next) => {
  const categoryId = req.params.id;

  Customer.findById(categoryId)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ error: "Customer not found" });
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
