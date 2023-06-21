import mongoose from "mongoose";

const OrderPlacedSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  placedOrder: [],
});

export default mongoose.model("OrderPlaced", OrderPlacedSchema);
