import { Router } from "express";
import { addRateProduct } from "../controllers/RateProduct/create.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { validateId } from "../middleware/validateId.js";
import {
  averageRateProduct,
  readRateProduct,
} from "../controllers/RateProduct/read.js";
import { deleteRateProduct } from "../controllers/RateProduct/delete.js";
import { updateRateProduct } from "../controllers/RateProduct/update.js";

export const RateProductRoute = Router();

RateProductRoute.route("/product/rate/:id")
  .get(validateId, readRateProduct)
  .post(verifyUser, validateId, addRateProduct);

RateProductRoute.route("/product/rate/average/:id").get(
  validateId,
  averageRateProduct
);
RateProductRoute.route("/product/rate/:id/rate_id/:rate_id")
  .put(verifyUser, validateId, updateRateProduct)
  .delete(verifyUser, validateId, deleteRateProduct);
