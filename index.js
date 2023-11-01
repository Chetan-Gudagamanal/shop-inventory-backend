import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { handleRegister } from "./controllers/handleRegister.js";
import { handleLogin } from "./controllers/handleLogin.js";
import { auth } from "./middleware/auth.js";
import { handleCreateShop } from "./controllers/handleCreateShop.js";
import { handleAddProducts } from "./controllers/handleAddProducts.js";
import { handleGetProductsByShopId } from "./controllers/handleGetProductsByShopId.js";
import { handleDeleteProduct } from "./controllers/handleDeleteProduct.js";
import { handleGetShopDetailOfUser } from "./controllers/handleGetShopDetailOfUser.js";
import { handleUpdateProduct } from "./controllers/handleUpdateProduct.js";

const app = express();
const port = process.env.PORT || 8001;

const url = process.env.MONGODB_URI || "mongodb://localhost/shop_inventory_db";
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
con.on("open", () => {
  console.log("Mongo DB connected");
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome");
});

//register new user
app.post("/register", (req, res) => {
  handleRegister(req, res);
});

//handle login details sent from user
app.post("/login", (req, res) => {
  handleLogin(req, res);
});

//handle authorization, to secure some end points
app.get("/check_authorized", auth, (req, res) => {
  res.status(200).json("Success");
});

// add shop
app.post("/create_shop", auth, (req, res) => {
  handleCreateShop(req, res);
});

//get users shop data
app.get("/get_shop_details/:userId", auth, (req, res) => {
  handleGetShopDetailOfUser(req, res);
});

// add product
app.post("/add_products", auth, (req, res) => {
  handleAddProducts(req, res);
});

// get products by shop id
app.get("/products_in_shop/:shopId", auth, (req, res) => {
  handleGetProductsByShopId(req, res);
});

//update product
app.patch("/update_product/:id", auth, (req, res) => {
  handleUpdateProduct(req, res);
});

//delete product
app.delete("/delete_product/:id/", auth, (req, res) => {
  handleDeleteProduct(req, res);
});

app.listen(port, () => {
  console.log("server started on port", port);
});
