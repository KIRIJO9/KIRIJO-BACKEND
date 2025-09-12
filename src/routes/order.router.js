import express from "express";
import {
  placeOrder,
  updateOrderStatus,
  getUserOrders
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/placeOrder", placeOrder);
router.post("/updateStatus", updateOrderStatus);
router.get("/user/:userId", getUserOrders);

export default router;
