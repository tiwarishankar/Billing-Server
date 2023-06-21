import ProductItems from "../models/ProductItems.js";
import {
  ERROR_DELETE_PRODUCT_MSG,
  ERROR_UPDATING_PRODUCT,
  LIST_OF_ALL_PRODUCT,
  PRODUCT_DELETED_MSG,
  PRODUCT_NOT_CREATED_MSG,
  PRODUCT_NOT_FOUND,
  PRODUCT_UPDATED_MSG,
} from "../utils/constants.js";

export const createProduct = async (req, res) => {
  const newProduct = new ProductItems(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(404).json({ message: PRODUCT_NOT_CREATED_MSG });
  }
};
export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await ProductItems.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      updatedProduct: updateProduct,
      message: PRODUCT_UPDATED_MSG,
    });
  } catch (err) {
    res.status(404).json({ message: ERROR_UPDATING_PRODUCT });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    await ProductItems.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: PRODUCT_DELETED_MSG });
  } catch (err) {
    res.status(404).json({ message: ERROR_DELETE_PRODUCT_MSG });
  }
};
export const getAllProduct = async (req, res) => {
  try {
    const product = await ProductItems.find({});
    res.status(200).json({ data: product, message: LIST_OF_ALL_PRODUCT });
  } catch (err) {
    res.status(404).json({ message: PRODUCT_NOT_FOUND });
  }
};
