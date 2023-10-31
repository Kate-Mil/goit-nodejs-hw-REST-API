import express from "express";

import authController from "../../controllers/auth-controller.js";
import { isEmptyBody, authenticate, upload } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userJoiSchema, userJoiEmailSchema } from "../../models/User.js";

const userValidate = validateBody(userJoiSchema);
const userEmailValidate = validateBody(userJoiEmailSchema);

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  userValidate,
  authController.register
);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post(
  "/verify",
  isEmptyBody,
  userEmailValidate,
  authController.resendVerifyEmail
);

authRouter.post("/login", isEmptyBody, userValidate, authController.login);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch(
  "/subscription",
  isEmptyBody,
  authenticate,
  authController.updateSubsctiption
);

authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  authController.updateAvatar
);

export default authRouter;
