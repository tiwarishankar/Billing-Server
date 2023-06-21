import express, { Router } from "express";
import { confirmOrder, getAllOrder } from "../controllers/orderPlaced.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/placed-order", verifyUser, confirmOrder);

router.get("/all-orders", getAllOrder); // FOR ADMIN TO GET LIST OF ALL ORDER

export default router;
