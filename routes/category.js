import { Router } from "express";
import {
  collectCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/category.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { validateUserId } from "../middleware/validateUserId.js";

export const categoryRoute = Router();

categoryRoute
  .route("/category")
  .get(collectCategory)
  .post(verifyUser, createCategory);

categoryRoute
  .route("/category/:id")
  .delete(verifyUser, validateUserId, deleteCategory)
  .put(verifyUser, validateUserId, updateCategory);
