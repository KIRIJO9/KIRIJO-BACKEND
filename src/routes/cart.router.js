import express from "express";
import {
  addOrUpdateCartItem,
  removeCartItem,
  getCart,
  updateCartItem
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/addOrUpdateItem", addOrUpdateCartItem);
router.delete("/removeItem", removeCartItem);
router.get("/:userId", getCart);
router.put("/updateItem", updateCartItem);

export default router;
