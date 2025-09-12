import express from "express";
import {
  addOrUpdateCartItem,
  removeCartItem,
  getCart,
  updateCartItem
} from "../controllers/cart.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/addOrUpdateItem", authMiddleware, addOrUpdateCartItem);
router.delete("/removeItem", authMiddleware, removeCartItem);
router.get("/:userId", authMiddleware, getCart);
router.put("/updateItem", authMiddleware, updateCartItem);

export default router;
