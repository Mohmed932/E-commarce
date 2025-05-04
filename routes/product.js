import { Router } from "express";

import { validateUserId } from "../middleware/validateUserId.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { verifyPermission } from "../middleware/verifyPermission.js";
import { uploadMultipleImages } from "../utils/cloudinary.js";
import { handleFileUploadError } from "../middleware/upload.js";
import { createProduct } from "../controllers/product/create.js";
import { getProduct, getSingleProduct } from "../controllers/product/read.js";
import { deleteProduct } from "../controllers/product/delete.js";
import {
  addImagesColorProduct,
  deleteImagesColorProduct,
  updateProduct,
} from "../controllers/product/update.js";

export const productRoute = Router();

productRoute
  .route("/product")
  .post(
    verifyUser,
    verifyPermission,
    uploadMultipleImages,
    handleFileUploadError,
    createProduct
  );

productRoute
  .route("/product/:id")
  .get(validateUserId, getSingleProduct)
  .delete(verifyUser, verifyPermission, validateUserId, deleteProduct)
  .put(verifyUser, verifyPermission, validateUserId, updateProduct);

productRoute
  .route("/product/images_color/:id")
  .post(
    verifyUser,
    verifyPermission,
    validateUserId,
    uploadMultipleImages,
    handleFileUploadError,
    addImagesColorProduct
  )
  .delete(
    verifyUser,
    verifyPermission,
    validateUserId,
    deleteImagesColorProduct
  );

productRoute.route("/product/category/:category").get(getProduct);
