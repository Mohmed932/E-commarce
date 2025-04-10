import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getSingleProduct,
} from "../controllers/product.js";
import {
  handleFileUploadError,
  uploadMultipleImages,
} from "../middleware/upload.js";
import { validateUserId } from "../middleware/validateUserId.js";
import { verifyUser } from "../middleware/verifyUser.js";

export const productRoute = Router();

productRoute
  .route("/product")
  .post(verifyUser, uploadMultipleImages, handleFileUploadError, createProduct);

productRoute
  .route("/product/:id")
  .get(validateUserId, getSingleProduct)
  .delete(verifyUser, validateUserId, deleteProduct);

productRoute.route("/product/:category").get(getProduct);
