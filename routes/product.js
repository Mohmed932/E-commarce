import { Router } from "express";
import {
  addImagesColorProduct,
  createProduct,
  deleteImagesColorProduct,
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
import { verifyPermission } from "../middleware/verifyPermission.js";

export const productRoute = Router();

productRoute
  .route("/product")
  .post(verifyUser,verifyPermission,uploadMultipleImages, handleFileUploadError, createProduct);

productRoute
  .route("/product/:id")
  .get(validateUserId, getSingleProduct)
  .delete(verifyUser,verifyPermission, validateUserId, deleteProduct)
  .put(verifyUser,verifyPermission,validateUserId, updateProduct);

productRoute
  .route("/product/images_color/:id")
  .post(verifyUser,verifyPermission,validateUserId,uploadMultipleImages, handleFileUploadError, addImagesColorProduct)
  .delete(verifyUser,verifyPermission,validateUserId, deleteImagesColorProduct);

productRoute.route("/product/category/:category").get(getProduct);
