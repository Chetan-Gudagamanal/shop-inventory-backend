import { shops } from "../models/ShopSchema.js";

export const handleGetShopDetailOfUser = async (req, res) => {
  const userId = req.params.userId;
  console.log(req.params);
  let shop_data;
  try {
    shop_data = await shops.find({ userId: userId });
  } catch (err) {
    res.status(500).json(err);
  }
  res.status(200).json({
    shops: shop_data.map((p) => p.toObject({ getters: true })),
  });
};
