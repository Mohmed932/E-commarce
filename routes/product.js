import { Router } from "express";
import { createProduct } from "../controllers/product.js";
import {
  handleFileUploadError,
  uploadMultipleImages,
} from "../middleware/upload.js";

export const productRoute = Router();

productRoute
  .route("/product")
  .post(uploadMultipleImages,handleFileUploadError, createProduct);
