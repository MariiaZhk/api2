import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userServices from "../services/userServices.js";
import * as authServices from "../services/authServices.js";
import { ctrlTryCatchWrapper } from "../helpers/ctrlTryCatchWrapper.js";
import HttpError from "../helpers/HttpError.js";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await userServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await authServices.register({
    ...req.body,
    password: hashPassword,
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

export default {
  register: ctrlTryCatchWrapper(register),
  login: ctrlTryCatchWrapper(login),
  getCurrent: ctrlTryCatchWrapper(getCurrent),
  logout: ctrlTryCatchWrapper(logout),
  updateSubscription: ctrlTryCatchWrapper(updateSubscription),
};
