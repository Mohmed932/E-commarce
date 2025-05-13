import { Router } from "express";

import { verifyUser } from "../middleware/verifyUser.js";
import { verifyPermission } from "../middleware/verifyPermission.js";
import { validateId } from "../middleware/validateId.js";
import { uploadImagesMiddleware } from "../utils/upload/upload.js";
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
    verifyUser,
    verifyPermission,
    uploadImagesMiddleware,
    handleFileUploadError,
    createProduct
  );

productRoute
  .route("/product/:id")
  .get(validateId, getSingleProduct)
  .delete(verifyUser, verifyPermission, validateId, deleteProduct)
  .put(verifyUser, verifyPermission, validateId, updateProduct);

productRoute
  .route("/product/add-images/:id")
  .post(
    verifyUser,
    verifyPermission,
    validateId,
    uploadImagesMiddleware,
    handleFileUploadError,
    addImagesColorProduct
  )
  .delete(verifyUser,
    verifyPermission,
    validateId, deleteImagesColorProduct);

productRoute.route("/product/category/:category").get(getProduct);
