const express = require("express");
const multer = require("multer");
const {
  secureUpload,
  createProductController,
  createVariantController,
  allProductsController,
} = require("../../controllers/productController");
const _ = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const format = file.originalname.split(".");

    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + `.${format[format.length - 1]}`
    );
  },
});

const upload = multer({ storage: storage });

_.post("/createProduct", secureUpload, createProductController);
_.post("/createVariant", upload.single("image"), createVariantController);
_.get("/allProducts", allProductsController);

module.exports = _;
