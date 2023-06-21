import ProductItems from "../models/ProductItems.js";
import UserProducts from "../models/UserProducts.js";
import {
  ALL_PRODUCT_REMOVED_CART,
  CHECKOUT_CART_MSG,
  ERROR_REMOVING_PRODUCT_MSG,
  PRODUCT_ADDED_MSG,
  PRODUCT_NOT_FOUND,
  PRODUCT_REMOVED_FROM_CART_MSG,
  USER_NOT_FOUND,
} from "../utils/constants.js";
import { calculateTax } from "../utils/totalBill.js";

export const addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
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
    res.status(200).json({ message: PRODUCT_ADDED_MSG });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const userProduct = await UserProducts.findOne({ userId });

    if (!userProduct) {
      return res.status(400).json({ message: USER_NOT_FOUND });
    }

    const productIndex = userProduct.userProducts.indexOf(productId);

    if (productIndex === -1) {
      return res.status(400).json({ message: PRODUCT_NOT_FOUND });
    }

    // Remove the product from the userProducts array
    userProduct.userProducts.splice(productIndex, 1);
    await userProduct.save();

    res.status(200).json({ message: PRODUCT_REMOVED_FROM_CART_MSG });
  } catch (error) {
    res.status(500).json({ message: ERROR_REMOVING_PRODUCT_MSG });
  }
};

export const clearUserCart = async (req, res) => {
  const { userId } = req.body;
  try {
    const userProduct = await UserProducts.findOne({ userId });

    if (!userProduct) {
      return res.status(400).json({ message: USER_NOT_FOUND });
    }

    userProduct.userProducts = [];
    await userProduct.save();

    res.status(200).json({ message: ALL_PRODUCT_REMOVED_CART });
  } catch (error) {
    console.error(ERROR_REMOVING_PRODUCT_MSG, error);
    res.status(500).json({ message: ERROR_REMOVING_PRODUCT_MSG });
  }
};

export const checkoutCart = async (req, res) => {
  const { userId } = req.body;
  try {
    const userProduct = await UserProducts.findOne({ userId });
    if (!userProduct) {
      return res.status(400).json({ message: USER_NOT_FOUND });
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
      .json({ total_bill: total_bill, message: CHECKOUT_CART_MSG });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
