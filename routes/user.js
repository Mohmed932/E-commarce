import { Router } from "express";
import {
  activeAccount,
  addAddress,
  checkLinkForgetPassword,
  createAccount,
  createAvatar,
  deleteAvatar,
  loginAccount,
  remevoAddress,
  resetPassword,
  sendEmailForgetPassword,
  updateAddress,
} from "../controllers/user.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { validateUserId } from "../middleware/validateUserId.js";
import { handleFileUploadError, upload } from "../middleware/upload.js";

export const uesrRouter = Router();

uesrRouter.route("/create_account").post(createAccount);
uesrRouter.route("/login_account").post(loginAccount);
uesrRouter
  .route("/account_id/:id/active_account/:token")
  .post(validateUserId, activeAccount);
uesrRouter.route("/forget_password").post(sendEmailForgetPassword);
uesrRouter
  .route("/account_id/:id/check_link/:token")
  .get(validateUserId, checkLinkForgetPassword);
uesrRouter
  .route("/account_id/:id/reset_password/:token")
  .put(validateUserId, resetPassword);
uesrRouter
  .route("/avatar")
  .post(verifyUser, upload, handleFileUploadError, createAvatar)
  .delete(verifyUser, deleteAvatar);

uesrRouter.route("/address").post(verifyUser, addAddress);
uesrRouter
  .route("/address/:id")
  .put(validateUserId, verifyUser, updateAddress)
  .delete(validateUserId, verifyUser, remevoAddress);
