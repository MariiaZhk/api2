import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export const findUser = (filter) => User.findOne(filter);
export const register = (data) => User.create(data);
