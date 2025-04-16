import { Router } from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import { getCart } from "../controllers/cart.js";
import { validateUserId } from "../middleware/validateUserId.js";

export const cartRoute = Router();

cartRoute.route("/cart").get(verifyUser, getCart).post(verifyUser);

cartRoute
  .route("/cart/:id")
  .delete(validateUserId, verifyUser)
  .put(validateUserId, verifyUser);
