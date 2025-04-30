import { Router } from "express";
import { addRateProduct } from "../controllers/RateProduct/create.js";
import { validateUserId } from "../middleware/validateUserId.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { readRateProduct } from "../controllers/RateProduct/read.js";
import { deleteRateProduct } from "../controllers/RateProduct/delete.js";

export const RateProductRoute = Router();

RateProductRoute.route("/product/rate/:id")
  .get(validateUserId, readRateProduct)
  .post(verifyUser, validateUserId, addRateProduct);

RateProductRoute.route("/product/rate/:id/rate_id/:rate_id").delete(
  verifyUser,
  validateUserId,
  deleteRateProduct
);
