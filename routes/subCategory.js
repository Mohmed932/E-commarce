import { Router } from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import { validateUserId } from "../middleware/validateUserId.js";
import {
  collectsubCategory,
  createsubCategory,
  deletesubCategory,
  updatesubCategory,
} from "../controllers/subCategory.js";

export const subCategoryRoute = Router();

subCategoryRoute
  .route("/subcategory/:id")
  .get(validateUserId, collectsubCategory)
  .post(verifyUser, validateUserId, createsubCategory)
  .delete(verifyUser, validateUserId, deletesubCategory)
  .put(verifyUser, validateUserId, updatesubCategory);
