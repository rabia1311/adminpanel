const express = require("express");
const multer = require("multer");
const router = express.Router();
const Storage = multer.diskStorage({
  destination: "brandimg/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
});
const {
  createBrand,
  getBrand,
  deleteBrand,
  updateBrand,
} = require("../controllers/brand.controller");

const Brand = require("../Models/Brand");

router.post("/brand", upload.single("image"), createBrand);
router.get("/brand", getBrand);
router.delete("/brand/:id", deleteBrand);
router.put("/brand/:id", upload.single("image"), updateBrand);

router.get("/brand/:id", (req, res, next) => {
  const brandId = req.params.id;

  Brand.findById(brandId)
    .then((brand) => {
      if (!brand) {
        return res.status(404).json({ error: "Brand not found" });
      }

      res.status(200).json({ brand });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the brand" });
    });
});

module.exports = router;
