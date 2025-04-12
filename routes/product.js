import { Router } from "express";
import {
  addImagesColorProduct,
  createProduct,
  deleteProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
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
  // post(verifyUser, uploadMultipleImages, handleFileUploadError, createProduct);
  .post(uploadMultipleImages, handleFileUploadError, createProduct);

productRoute
  .route("/product/:id")
  .get(validateUserId, getSingleProduct)
  .delete(verifyUser, validateUserId, deleteProduct)
  .put(validateUserId, updateProduct);

productRoute
  .route("/product/images_color/:id")
  .post(validateUserId,uploadMultipleImages, handleFileUploadError, addImagesColorProduct);

productRoute.route("/product/:category").get(getProduct);
