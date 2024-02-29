import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import * as userServices from "../services/userServices.js";
import * as authServices from "../services/authServices.js";
import { ctrlTryCatchWrapper } from "../helpers/ctrlTryCatchWrapper.js";
import HttpError from "../helpers/HttpError.js";
import "dotenv/config";

const avatarsDir = path.resolve("public", "avatars");
const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await userServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await authServices.register({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "72h" });
  await authServices.setToken(user._id, token);

  res.status(201).json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await authServices.setToken(_id);

  res.status(204).json({
    message: "No Content",
  });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription: newSubscription } = req.body;
  const { email, subscription } = await userServices.updateSubscription(
    _id,
    newSubscription
  );

  res.json({ user: { email, subscription } });
};

const updateAvatar = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  console.log(req.body);
  console.log(req.file);
  const newPath = path.join(avatarsDir, filename);
  await fs.rename(oldPath, newPath);
  // await fs.unlink(oldPath);
  console.log(oldPath);
  const avatarURL = path.join("avatars", filename);
  await userServices.updateAvatar(owner, avatarURL);
  res.status(200).json({ avatarURL });
};

export default {
  register: ctrlTryCatchWrapper(register),
  login: ctrlTryCatchWrapper(login),
  getCurrent: ctrlTryCatchWrapper(getCurrent),
  logout: ctrlTryCatchWrapper(logout),
  updateSubscription: ctrlTryCatchWrapper(updateSubscription),
  updateAvatar: ctrlTryCatchWrapper(updateAvatar),
};