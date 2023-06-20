import ProductItems from "../models/ProductItems.js";
import Room from "../models/UserProducts.js";

export const createProduct = async (req, res) => {
  const newProduct = new ProductItems(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(404).json("not created");
  }
};
export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await ProductItems.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(404).json("not updated");
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    await ProductItems.findByIdAndDelete(req.params.id);
    res.status(200).json("ProductItems has been deleted.");
  } catch (err) {
    res.status(404).json("not deleted");
  }
};
export const getAllProduct = async (req, res, next) => {
  try {
    const product = await ProductItems.find({});
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json("Not found");
  }
};
