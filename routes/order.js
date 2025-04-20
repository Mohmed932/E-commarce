import { Router } from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import { createOrder, getOrders, updateOrder } from "../controllers/order.js";
import { validateUserId } from "../middleware/validateUserId.js";

export const orderRoute = Router();

orderRoute
  .route("/order")
  .get(verifyUser, getOrders)
  .post(verifyUser, createOrder);

orderRoute.route("/order/:id").put(validateUserId, verifyUser, updateOrder);
