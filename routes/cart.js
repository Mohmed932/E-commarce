import { Router } from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import {
  addProductToCart,
  deleteProductFromCart,
  getCart,
} from "../controllers/cart.js";
import { validateUserId } from "../middleware/validateUserId.js";

export const cartRoute = Router();

cartRoute
  .route("/cart")
  .get(verifyUser, getCart)
  .post(verifyUser, addProductToCart);

cartRoute
  .route("/cart/:id")
  .delete(validateUserId, verifyUser, deleteProductFromCart);
