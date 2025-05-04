import { Router } from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import { validateUserId } from "../middleware/validateUserId.js";
import { collectCategory } from "../controllers/category/read.js";
import { createCategory } from "../controllers/category/create.js";
import { deleteCategory } from "../controllers/category/delete.js";
import { updateCategory } from "../controllers/category/update.js";
import { verifyPermission } from "../middleware/verifyPermission.js";

export const categoryRoute = Router();

categoryRoute
  .route("/category")
  .get(collectCategory)
  .post(verifyUser, verifyPermission, createCategory);

categoryRoute
  .route("/category/:id")
  .delete(verifyUser, validateUserId, verifyPermission, deleteCategory)
  .put(verifyUser, validateUserId, verifyPermission, updateCategory);
