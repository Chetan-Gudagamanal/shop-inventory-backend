import { products } from "../models/ProductSchema.js";

export const handleUpdateProduct = async (req, res) => {
  const { id } = req.params;
  const { productname, description, price, quantity } = req.body;
  console.log(productname);

  try {
    const product = await products.findById(id);
    console.log(product);
    if (productname) {
      product.productname = productname;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }
    if (quantity) {
      product.quantity = quantity;
    }
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};
