import Joi from "joi";
import { emailRegexp } from "../constants/regexp.js";

export const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const subscriptionSchema = Joi.object({
  enum: Joi.string().valid("starter", "pro", "business").required(),
});
