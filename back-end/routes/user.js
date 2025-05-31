import { Router } from "express";

import { verifyUser } from "../middleware/verifyUser.js";
import { validateId } from "../middleware/validateId.js";

import { createAccount } from "../controllers/user/auth/createAccount.js";
import { loginAccount } from "../controllers/user/auth/loginAccount.js";
import { activeAccount } from "../controllers/user/auth/activeAccount.js";
import { sendEmailForgetPassword } from "../controllers/user/auth/sendEmailForgetPassword.js";
import { checkLinkForgetPassword } from "../controllers/user/auth/checkLinkForgetPassword.js";
import { resetPassword } from "../controllers/user/auth/resetPassword.js";
import { addAddress, createAvatar } from "../controllers/user/create.js";
import { deleteAvatar, removeAddress } from "../controllers/user/delete.js";
import { updateAddress } from "../controllers/user/update.js";
import { upload } from "../utils/upload/upload.js";
import { handleFileUploadError } from "../middleware/handleFileUploadError.js";
import { readProfile } from "../controllers/user/read.js";
import { apiLimiterAuth } from "../middleware/rateLimit.js";

export const uesrRouter = Router();

uesrRouter.route("/create_account").post(apiLimiterAuth, createAccount);
uesrRouter.route("/login_account").post(apiLimiterAuth, loginAccount);
uesrRouter
  .route("/account_id/:id/active_account/:token")
  .post(apiLimiterAuth, validateId, activeAccount);
uesrRouter
  .route("/forget_password")
  .post(apiLimiterAuth, sendEmailForgetPassword);
uesrRouter
  .route("/account_id/:id/check_link/:token")
  .get(validateId, checkLinkForgetPassword);
uesrRouter
  .route("/account_id/:id/reset_password/:token")
  .put(apiLimiterAuth, validateId, resetPassword);
uesrRouter.route("/profile").get(verifyUser, readProfile);
uesrRouter.route("/check_user").get( verifyUser, readProfile);
uesrRouter
  .route("/avatar")
  .post(verifyUser, upload, handleFileUploadError, createAvatar)
  .delete(verifyUser, deleteAvatar);

uesrRouter.route("/address").post(verifyUser, addAddress);
uesrRouter
  .route("/address/:id")
  .put(validateId, verifyUser, updateAddress)
  .delete(validateId, verifyUser, removeAddress);
