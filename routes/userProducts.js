import express from "express";
import {
  addToCart,
  removeFromCart,
  clearUserCart,
  checkoutCart,
} from "../controllers/userProducts.js";

import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//add item to cart
router.post("/add-to-cart", verifyUser, addToCart);

//remove item from cart
router.delete("/remove-from-cart", verifyUser, removeFromCart);

//remove all items from cart
router.delete("/clear-cart", verifyUser, clearUserCart);

router.get("/checkout-cart", verifyUser, checkoutCart);

export default router;
