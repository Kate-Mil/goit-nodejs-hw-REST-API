import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import User from "../models/User.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  console.log(authorization);
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized 1");
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      throw HttpError(401, "Not authorized 2");
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized 3"));
  }
};

export default ctrlWrapper(authenticate);
