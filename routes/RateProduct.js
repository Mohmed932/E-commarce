import { Router } from "express";
import { addRateProduct } from "../controllers/RateProduct/create.js";
import { validateUserId } from "../middleware/validateUserId.js";
import { verifyUser } from "../middleware/verifyUser.js";
import {
  averageRateProduct,
  readRateProduct,
} from "../controllers/RateProduct/read.js";
import { deleteRateProduct } from "../controllers/RateProduct/delete.js";
import { updateRateProduct } from "../controllers/RateProduct/update.js";

export const RateProductRoute = Router();

RateProductRoute.route("/product/rate/:id")
  .get(validateUserId, readRateProduct)
  .post(verifyUser, validateUserId, addRateProduct);

RateProductRoute.route("/product/rate/average/:id").get(
  validateUserId,
  averageRateProduct
);
RateProductRoute.route("/product/rate/:id/rate_id/:rate_id")
  .put(verifyUser, validateUserId, updateRateProduct)
  .delete(verifyUser, validateUserId, deleteRateProduct);
