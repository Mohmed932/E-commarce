import { Router } from "express";

import { verifyUser } from "../middleware/verifyUser.js";
import { validateId } from "../middleware/validateId.js";
import { verifyPermission } from "../middleware/verifyPermission.js";
import { uploadImage } from "../utils/upload/upload.js";

import { collectsubCategory } from "../controllers/subCategory/read.js";
import { createsubCategory } from "../controllers/subCategory/create.js";
import { deletesubCategory } from "../controllers/subCategory/delete.js";
import { updatesubCategory } from "../controllers/subCategory/update.js";

export const subCategoryRoute = Router();

subCategoryRoute
  .route("/subcategory/:id")
  .get(validateId, collectsubCategory)
  .post(
    verifyUser,
    validateId,
    verifyPermission,
    uploadImage,
    createsubCategory
  )
  .delete(verifyUser, validateId, verifyPermission, deletesubCategory)
  .put(
    verifyUser,
    validateId,
    verifyPermission,
    uploadImage,
    updatesubCategory
  );
