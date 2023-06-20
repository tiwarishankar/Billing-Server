import mongoose from "mongoose";

///this is Room Schema
const UserProducts = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userProducts: [],
});

export default mongoose.model("UserProducts", UserProducts);
