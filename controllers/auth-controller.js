import fs from "node:fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import gravatar from "gravatar";
import Jimp from "jimp";

const { JWT_SECRET } = process.env;
const avatarPath = path.resolve("public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarUrl = gravatar.url(email, {
    protocol: "http",
    s: "250",
    r: "pg",
    d: "mp",
  });

  const newUser = await User.create({
    ...req.body,
    avatarUrl,
    password: hashPassword,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: "starter",
    avatarUrl,
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
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { email, subscription, avatarUrl } = req.user;
  res.status(200).json({ email, subscription, avatarUrl });
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const user = req.user;
  await User.findByIdAndUpdate(user._id, { subscription });

  res.status(201).json({ email: user.email, subscription });
};

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(404, `Please add image`);
  }

  const avatar = await Jimp.read(req.file.path);
  avatar.resize(250, 250);
  avatar.write(req.file.path);

  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarUrl = path.join("avatars", filename);

  const user = req.user;

  await User.findByIdAndUpdate(user._id, { avatarUrl });

  res.status(201).json({ avatarUrl });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubsctiption: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
