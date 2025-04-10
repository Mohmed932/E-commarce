import { Router } from "express";
import { createProduct, deleteProduct } from "../controllers/product.js";
import {
  handleFileUploadError,
  uploadMultipleImages,
} from "../middleware/upload.js";
import { validateUserId } from "../middleware/validateUserId.js";

export const productRoute = Router();

productRoute
  .route("/product")
  .post(uploadMultipleImages,handleFileUploadError, createProduct);

productRoute
  .route("/product/:id")
  .delete(validateUserId, deleteProduct);
