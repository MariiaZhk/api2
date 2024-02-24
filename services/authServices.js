import { User } from "../models/User.js";

export const register = (data) => User.create(data);

export const setToken = async (id, token = "") =>
  User.findByIdAndUpdate(id, { token });
