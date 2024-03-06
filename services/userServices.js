import { User } from "../models/User.js";

export const findUser = (filter) => User.findOne(filter);

export const findUserById = (id) => User.findById(id);

export const updateSubscription = (id, subscription) =>
  User.findByIdAndUpdate(id, { subscription });

export const updateAvatar = (id, avatarURL) =>
  User.findByIdAndUpdate(id, { avatarURL });

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);
