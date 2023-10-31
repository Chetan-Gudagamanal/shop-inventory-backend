import { products } from "../models/ProductSchema.js";

export const handleDeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await products.deleteOne({ _id: id });
    console.log(product);
    // await products.deleteOne(product);

    res.send({
      message: "Deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send("Invalid Request");
  }
};
