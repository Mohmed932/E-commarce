import { Router } from "express";

import { verifyUser } from "../middleware/verifyUser.js";
import { validateId } from "../middleware/validateId.js";

import { handleFileUploadError } from "../middleware/handleFileUploadError.js";
import { verifyPermission } from "../middleware/verifyPermission.js";
import { uploadImage } from "../utils/upload/upload.js";

import { collectBrand } from "../controllers/brand/read.js";
import { createBrand } from "../controllers/brand/create.js";
import { deleteBrand } from "../controllers/brand/delete.js";

export const brandRoute = Router();

brandRoute
  .route("/brand/:id")
  .get(collectBrand)
  .post(
    verifyUser,
    validateId,
    verifyPermission,
    uploadImage,
    handleFileUploadError,
    createBrand
  )
  .delete(verifyUser, validateId, verifyPermission, deleteBrand);
