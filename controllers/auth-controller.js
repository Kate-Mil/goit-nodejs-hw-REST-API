import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hasPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hasPassword });
  res.status(201).json({
    email: newUser.email,
    subscription: "starter",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const token = "sgsfd.45234.3333";
  res.status(200).json({
    token: token,
    user: {
      email: user.email,
      subscription: "starter",
    },
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
