import { Router } from "express";

import { verifyUser } from "../middleware/verifyUser.js";
import { validateUserId } from "../middleware/validateUserId.js";
import { handleFileUploadError } from "../middleware/upload.js";
import { verifyPermission } from "../middleware/verifyPermission.js";

import { collectBrand } from "../controllers/brand/read.js";
import { uploadAvatat } from "../utils/cloudinary.js";
import { createBrand } from "../controllers/brand/create.js";
import { deleteBrand } from "../controllers/brand/delete.js";

export const brandRoute = Router();

brandRoute
  .route("/brand/:id")
  .get(collectBrand)
  .post(
    verifyUser,
    validateUserId,
    verifyPermission,
    uploadAvatat,
    handleFileUploadError,
    createBrand
  )
  .delete(verifyUser, validateUserId, verifyPermission, deleteBrand);
