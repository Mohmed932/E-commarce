import { Router } from "express";

import { verifyUser } from "../middleware/verifyUser.js";
import { validateUserId } from "../middleware/validateUserId.js";
import { uploadImage } from "../middleware/upload.js";
import { verifyPermission } from "../middleware/verifyPermission.js";

import { collectsubCategory } from "../controllers/subCategory/read.js";
import { createsubCategory } from "../controllers/subCategory/create.js";
import { deletesubCategory } from "../controllers/subCategory/delete.js";
import { updatesubCategory } from "../controllers/subCategory/update.js";

export const subCategoryRoute = Router();

subCategoryRoute
  .route("/subcategory/:id")
  .get(validateUserId, collectsubCategory)
  .post(
    verifyUser,
    validateUserId,
    verifyPermission,
    uploadImage,
    createsubCategory
  )
  .delete(verifyUser, validateUserId, verifyPermission, deletesubCategory)
  .put(
    verifyUser,
    validateUserId,
    verifyPermission,
    uploadImage,
    updatesubCategory
  );
