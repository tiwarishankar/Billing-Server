import ProductItems from "../models/ProductItems.js";
import UserProducts from "../models/UserProducts.js";
import { createError } from "../utils/error.js";
import { calculateTax } from "../utils/totalBill.js";

export const addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  console.log({ userId, productId });

  const userProduct = await UserProducts.findOne({ userId });

  if (userProduct) {
    userProduct.userProducts.push(productId);
    await userProduct.save();
  } else {
    const newUserProduct = new UserProducts({
      userId,
      userProducts: [productId],
    });
    await newUserProduct.save();
  }
  res.status(200).json({ message: "Product added successfully" });
};

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const userProduct = await UserProducts.findOne({ userId });

    if (!userProduct) {
      return res.status(400).json({ message: "User not found" });
    }

    const productIndex = userProduct.userProducts.indexOf(productId);

    if (productIndex === -1) {
      return res
        .status(400)
        .json({ message: "Product not found for the user" });
    }

    // Remove the product from the userProducts array
    userProduct.userProducts.splice(productIndex, 1);
    await userProduct.save();

    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product", error);
    res.status(500).json({ message: "Error removing product" });
  }
};

export const clearUserCart = async (req, res) => {
  const { userId } = req.body;
  try {
    const userProduct = await UserProducts.findOne({ userId });

    if (!userProduct) {
      return res.status(400).json({ message: "User not found" });
    }

    userProduct.userProducts = [];
    await userProduct.save();

    res.status(200).json({ message: "All products removed successfully" });
  } catch (error) {
    console.error("Error removing products", error);
    res.status(500).json({ message: "Error removing products" });
  }
};

export const checkoutCart = async (req, res) => {
  const { userId } = req.body;
  const userProduct = await UserProducts.findOne({ userId });
  if (!userProduct) {
    return res.status(400).json({ message: "User not found" });
  }
  let allProducts = userProduct.userProducts;
  let total_bill = 0;
  for (let i = 0; i < allProducts.length; i++) {
    const product_Detail = await ProductItems.findById({
      _id: allProducts[i],
    });
    const product_price = product_Detail.price;
    total_bill +=
      calculateTax(product_price, product_Detail.product) + product_price;
  }
  res
    .status(200)
    .json({ total_bill: total_bill, message: "checkout products" });
};
//28230
