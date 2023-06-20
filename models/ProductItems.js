import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
});

export default mongoose.model("products", ProductSchema);
