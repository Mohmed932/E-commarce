import { Router } from "express";
import {
  activeAccount,
  checkLinkForgetPassword,
  createAccount,
  createAvatar,
  deleteAvatar,
  loginAccount,
  resetPassword,
  sendEmailForgetPassword,
} from "../controllers/user.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { handleFileUploadError, upload } from "../middleware/upload.js";

export const uesrRouter = Router();

uesrRouter.route("/create_account").post(createAccount);
uesrRouter.route("/login_account").post(loginAccount);
uesrRouter.route("/account_id/:id/active_account/:token").post(activeAccount);
uesrRouter.route("/forget_password").post(sendEmailForgetPassword);
uesrRouter
  .route("/check_link/account_id/:id/active_account/:token")
  .get(checkLinkForgetPassword);
uesrRouter.route("/reset_password").put(resetPassword);
uesrRouter
  .route("/avatar")
  .post(verifyUser, upload, handleFileUploadError, createAvatar);
uesrRouter.route("/avatar").delete(verifyUser, deleteAvatar);
