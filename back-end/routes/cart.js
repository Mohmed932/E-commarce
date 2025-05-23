import { Router } from "express";

import { verifyUser } from "../middleware/verifyUser.js";
import { validateId } from "../middleware/validateId.js";
import { verifyPermission } from "../middleware/verifyPermission.js";

import { getCart } from "../controllers/cart/read.js";
import { addProductToCart } from "../controllers/cart/create.js";
import { deleteProductFromCart } from "../controllers/cart/delete.js";
import { updateCart } from "../controllers/cart/update.js";
import { checkout } from "../controllers/cart/checkout.js";

export const cartRoute = Router();

cartRoute
  .route("/cart")
  .get(verifyUser, getCart)
  .post(verifyUser, addProductToCart);



cartRoute.route("/cart/checkout")
  .post(verifyUser, checkout);


cartRoute
  .route("/cart/:id")
  .put(verifyUser, validateId, verifyPermission, updateCart)
  .delete(validateId, verifyUser, verifyPermission, deleteProductFromCart);
