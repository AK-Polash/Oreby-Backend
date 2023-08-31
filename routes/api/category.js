const express = require("express");
const {
  createCategoryController,
  categoryStatusController,
  allCategoryController,
  createSubCategoryController,
  subCategoryStatusController,
  allSubCategoryController,
} = require("../../controllers/categoryController");
const _ = express.Router();

_.post("/createCategory", createCategoryController);
_.post("/categoryStatus", categoryStatusController);
_.get("/allCategory", allCategoryController);
_.post("/createSubCategory", createSubCategoryController);
_.post("/subCategoryStatus", subCategoryStatusController);
_.get("/allSubCategory", allSubCategoryController);

module.exports = _;
