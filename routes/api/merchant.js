const express = require("express");
const {
  becomeMerchantController,
  merchantStatusController,
  allMerchantController,
  merchantProductsController,
} = require("../../controllers/merchantController");
const _ = express.Router();

_.post("/becomeMerchant", becomeMerchantController);
_.post("/merchantStatus", merchantStatusController);
_.get("/allMerchant", allMerchantController);
_.get("/merchantProducts", merchantProductsController);

module.exports = _;
