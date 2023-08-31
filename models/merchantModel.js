const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeSchema = new Schema({
  storeName: {
    type: String,
    required: true,
  },
  storeEmail: {
    type: String,
    required: true,
    unique: true,
  },
  storePhone: {
    type: String,
    required: true,
  },
  storeAddress: {
    type: String,
    required: true,
  },
  voterIdNumber: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  status: {
    type: String,
    default: "waiting",
    enum: ["waiting", "approved", "rejected"],
  },
});

module.exports = mongoose.model("Store", storeSchema);
