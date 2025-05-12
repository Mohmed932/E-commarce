import { Router } from "express";

import { verifyUser } from "../middleware/verifyUser.js";
import { verifyPermission } from "../middleware/verifyPermission.js";
import { validateId } from "../middleware/validateId.js";
import { uploadMultipleImages } from "../utils/upload/upload.js";
import { handleFileUploadError } from "../middleware/handleFileUploadError.js";
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
    // verifyUser,
    // verifyPermission,
    uploadMultipleImages,
    handleFileUploadError,
    createProduct
  );

productRoute
  .route("/product/:id")
  .get(validateId, getSingleProduct)
  .delete(verifyUser, verifyPermission, validateId, deleteProduct)
  .put(updateProduct);

productRoute
  .route("/product/images_color/:id")
  .post(
    verifyUser,
    verifyPermission,
    validateId,
    uploadMultipleImages,
    handleFileUploadError,
    addImagesColorProduct
  )
  .delete(deleteImagesColorProduct);

productRoute.route("/product/category/:category").get(getProduct);
