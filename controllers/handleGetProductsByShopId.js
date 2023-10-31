import { products } from "../models/ProductSchema.js";

export const handleGetProductsByShopId = async (req, res) => {
  const shopId = req.params.shopId;
  console.log(req.params);
  let products_data;
  try {
    products_data = await products.find({ shopId: shopId });
  } catch (err) {
    res.status(500).json(err);
  }
  res.status(200).json({
    products: products_data.map((p) => p.toObject({ getters: true })),
  });
};
