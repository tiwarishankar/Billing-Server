import {
  CONFIRM_ORDER_MSG,
  ERROR_500,
  USER_NOT_FOUND,
} from "../utils/constants.js";
import UserProducts from "../models/UserProducts.js";
import OrdersPlaced from "../models/OrdersPlaced.js";

export const confirmOrder = async (req, res) => {
  const { userId } = req.body;

  try {
    // Find user products for the given userId
    const userProducts = await UserProducts.findOne({ userId });

    if (!userProducts) {
      return res.status(404).json({ message: USER_NOT_FOUND });
    }

    // Insert user products into OrderPlaced collection
    await OrdersPlaced.create({
      userId: userProducts.userId,
      placedOrder: userProducts.userProducts,
    });

    userProducts.userProducts = [];
    await userProducts.save();

    res.json({ message: CONFIRM_ORDER_MSG });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_500 });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const orders = await OrdersPlaced.find();

    res.json({ data: orders, message: "List of all orders" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_500 });
  }
};
