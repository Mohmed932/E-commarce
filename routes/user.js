import { Router } from "express";

import { verifyUser } from "../middleware/verifyUser.js";
import { validateUserId } from "../middleware/validateUserId.js";
import { handleFileUploadError, upload } from "../middleware/upload.js";

import { createAccount } from "../controllers/user/auth/createAccount.js";
import { loginAccount } from "../controllers/user/auth/loginAccount.js";
import { activeAccount } from "../controllers/user/auth/activeAccount.js";
import { sendEmailForgetPassword } from "../controllers/user/auth/sendEmailForgetPassword.js";
import { checkLinkForgetPassword } from "../controllers/user/auth/checkLinkForgetPassword.js";
import { resetPassword } from "../controllers/user/auth/resetPassword.js";
import { addAddress, createAvatar } from "../controllers/user/create.js";
import { deleteAvatar, remevoAddress } from "../controllers/user/delete.js";
import { updateAddress } from "../controllers/user/update.js";

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
