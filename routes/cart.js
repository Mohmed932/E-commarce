import { Router } from "express";

import { verifyUser } from "../middleware/verifyUser.js";
import { validateUserId } from "../middleware/validateUserId.js";
import { getCart } from "../controllers/cart/read.js";
import { addProductToCart } from "../controllers/cart/create.js";
import { deleteProductFromCart } from "../controllers/cart/delete.js";

export const cartRoute = Router();

cartRoute
  .route("/cart")
  .get(verifyUser, getCart)
  .post(verifyUser, addProductToCart);

cartRoute
  .route("/cart/:id")
  .delete(validateUserId, verifyUser, deleteProductFromCart);
