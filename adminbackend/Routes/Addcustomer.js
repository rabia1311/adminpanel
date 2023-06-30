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
} = require("../controllers/customer.controller");

router.post("/customer", upload.single("image"), createCustomer);
router.get("/customer", getCustomer);
module.exports = router;
