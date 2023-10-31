import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  shopId: {
    type: String,
    required: true,
  },
});

export const products = mongoose.model("product", productSchema);
