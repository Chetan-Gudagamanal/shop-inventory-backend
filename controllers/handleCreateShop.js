import { shops } from "../models/ShopSchema.js";

export const handleCreateShop = async (req, res) => {
  const { shopName, description, address, location, userId } = req.body;
  const shop = new shops({
    shopName,
    description,
    address,
    location,
    userId,
    createdAt: new Date().toISOString(),
  });
  await shop.save();
  console.log("success");
  res.status(200).json("success");
};
