import express from "express";

import authController from "../../controllers/auth-controller.js";
import { isEmptyBody, authenticate } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userJoiSchema } from "../../models/User.js";

const userValidate = validateBody(userJoiSchema);

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  userValidate,
  authController.register
);

authRouter.post("/login", isEmptyBody, userValidate, authController.login);

authRouter.get("/current", authenticate, authController.getCurrent);

export default authRouter;
