import express from "express";

import authController from "../../controllers/auth-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userSignupSchema } from "../../models/User.js";

const userValidate = validateBody(userSignupSchema);

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, userValidate, authController.signup);

authRouter.post("/signin", isEmptyBody, userValidate, authController.signin);

export default authRouter;
