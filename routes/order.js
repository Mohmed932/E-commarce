import { Router } from "express";

import { validateUserId } from "../middleware/validateUserId.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { getOrders } from "../controllers/order/read.js";
import { createOrder } from "../controllers/order/create.js";
import { updateOrder } from "../controllers/order/update.js";
import { paymentProcess } from "../controllers/order/paymentProcess.js";
import { verifyPermission } from "../middleware/verifyPermission.js";

export const orderRoute = Router();

orderRoute
  .route("/order")
  .get(verifyUser, getOrders)
  .post(verifyUser, createOrder);

orderRoute
  .route("/order/:id")
  .put(validateUserId, verifyUser, verifyPermission, updateOrder);

orderRoute.route("/order/paymentprocess").post(paymentProcess);
