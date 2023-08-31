const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCategorySchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  discount: { type: Number, default: 0 },
  status: {
    type: String,
    default: "waiting",
    enum: ["waiting", "approved", "rejected"],
  },
  isActive: { type: Boolean, default: false },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
