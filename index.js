import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import productItemsRoute from "./routes/productItems.js";
import userProducts from "./routes/userProducts.js";
import ordersPlaced from "./routes/orderPlaced.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tiwarishankar587:TIWARISHAN@cluster0.whm1zg1.mongodb.net/"
    );
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute); // register and login
app.use("/api/product-items", productItemsRoute); // apis for CRUD product and services
app.use("/api/user-products", userProducts); // apis to add product/services to user cart
app.use("/api", ordersPlaced); // apis to confirm order and to get all order for admin till now

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
