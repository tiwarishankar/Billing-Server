import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../controllers/productItems.js";
import { verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//create product
router.post("/", verifyUser, createProduct);

//update product
router.put("/:id", verifyUser, updateProduct);

//delete product
router.delete("/:id", verifyUser, deleteProduct);

//get all products
router.get("/all-product", getAllProduct); // not proctected for any user any user can call this api

export default router;
