import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authServices from "../services/authServices.js";
import { ctrlTryCatchWrapper } from "../helpers/ctrlTryCatchWrapper.js";
import HttpError from "../helpers/HttpError.js";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
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
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "72h" });

  res.status(201).json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

export default {
  register: ctrlTryCatchWrapper(register),
  login: ctrlTryCatchWrapper(login),
};
