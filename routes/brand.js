import { Router } from "express";
import {
  collectBrand,
  createBrand,
  deleteBrand,
} from "../controllers/brand.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { upload, handleFileUploadError } from "../middleware/upload.js";
import { validateUserId } from "../middleware/validateUserId.js";

export const brandRoute = Router();

brandRoute
  .route("/brand/:id")
  .get(collectBrand)
  .post(verifyUser, validateUserId, upload, handleFileUploadError, createBrand)
  .delete(verifyUser, validateUserId, deleteBrand);
