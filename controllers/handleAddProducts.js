import { products } from "../models/ProductSchema.js";

export const handleAddProducts = async (req, res) => {
  const { productname, description, price, quantity, shopId } = req.body;
  const product = new products({
    productname,
    description,
    price,
    quantity,
    shopId,
    createdAt: new Date().toISOString(),
  });
  await product.save();
  console.log("success");
  res.status(200).json("success");
};
