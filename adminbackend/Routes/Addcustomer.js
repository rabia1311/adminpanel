const express = require("express");
const multer = require("multer");
const router = express.Router();
//storage
const Storage = multer.diskStorage({
  destination: "CustomerImg/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
});
const { createCustomer } = require("../controllers/customer.controller");

router.post("/customer", upload.single("image"), createCustomer);

module.exports = router;
