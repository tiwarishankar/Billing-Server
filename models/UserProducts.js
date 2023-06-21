import mongoose from "mongoose";

const UserProducts = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userProducts: [],
});

export default mongoose.model("UserProducts", UserProducts);
