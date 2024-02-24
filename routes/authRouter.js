import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema } from "../schemas/usersSchemas.js";
import authControllers from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  authControllers.register
);

authRouter.post("/login", authControllers.login);

export default authRouter;
