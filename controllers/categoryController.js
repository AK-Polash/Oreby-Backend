const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");
const nameValidation = require("../utils/nameValidation");

const createCategoryController = async (req, res) => {
  const { title, description } = req.body;
  if (nameValidation(res, title, "title")) return;

  try {
    const existingCategory = await Category.find({ title });

    if (existingCategory.length > 0) {
      return res.send({
        error: "Category already exist",
        errorField: "category",
      });
    }

    const category = new Category({
      title,
      description,
    });

    await category.save();
    return res.send({
      message: "category created successfully",
      category: category,
    });
  } catch (error) {
    console.log(error);
    return res.send({ error: "Internal server error" });
  }
};

const categoryStatusController = async (req, res) => {
  const { title, status } = req.body;

  try {
    if (status === "rejected" || status === "waiting") {
      await Category.findOneAndUpdate(
        { title },
        { $set: { status: status, isActive: false } },
        { new: true }
      );

      return res.send({ message: "Category rejected successfully" });
    } else if (status === "approved") {
      await Category.findOneAndUpdate(
        { title },
        { $set: { status: status, isActive: true } },
        { new: true }
      );

      return res.send({ message: "Category approved successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.send({ error: "Internal server error" });
  }
};

const allCategoryController = async (req, res) => {
  try {
    const category = await Category.find({}).populate(
      "subCategory",
      "-_id -__v"
    );

    if (category.length > 0) {
      return res.send(category);
    } else {
      return res.send({ error: "Can't find the categories" });
    }
  } catch (error) {
    console.log(error);
    return res.send({ error: "Internal server error" });
  }
};

// ================================== Sub-Category ==========================================

const createSubCategoryController = async (req, res) => {
  const { title, description, categoryId } = req.body;
  if (nameValidation(res, title, "title")) return;

  try {
    const existingSubCategory = await SubCategory.find({ title });

    if (existingSubCategory.length > 0) {
      return res.send({
        error: "Sub-category already exist",
        errorField: "subCategory",
      });
    }

    const subCategory = new SubCategory({
      title,
      description,
      category: categoryId, // eikhane category er Id "Dynamically" anbo kivabe..?
    });

    await subCategory.save();

    await Category.findOneAndUpdate(
      { _id: subCategory.category },
      { $push: { subCategory } },
      { new: true }
    );

    return res.send({
      message: "Sub-Category created successfully",
      subCategory: subCategory,
    });
  } catch (error) {
    console.log(error);
    return res.send({ error: "Internal server error" });
  }
};

const subCategoryStatusController = async (req, res) => {
  const { title, status } = req.body;

  try {
    if (status === "rejected" || status === "waiting") {
      await SubCategory.findOneAndUpdate(
        { title },
        { $set: { status: status, isActive: false } },
        { new: true }
      );

      return res.send({ message: "Sub-Category rejected successfully" });
    } else if (status === "approved") {
      await SubCategory.findOneAndUpdate(
        { title },
        { $set: { status: status, isActive: true } },
        { new: true }
      );

      return res.send({ message: "Sub-Category approved successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.send({ error: "Internal server error" });
  }
};

const allSubCategoryController = async (req, res) => {
  try {
    const subCategory = await SubCategory.find({}).populate(
      "category",
      "title description status created -_id"
    );

    if (subCategory.length > 0) {
      return res.send(subCategory);
    } else {
      return res.send({ error: "Can't find the sub-category" });
    }
  } catch (error) {
    console.log(error);
    return res.send({ error: "Internal server error" });
  }
};

module.exports = {
  createCategoryController,
  categoryStatusController,
  allCategoryController,
  createSubCategoryController,
  subCategoryStatusController,
  allSubCategoryController,
};
