import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
  },
  userId: {
    type: String,
    required: true,
  },
});

export const shops = mongoose.model("shop", shopSchema);
