import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema } from "../schemas/usersSchemas.js";
import authControllers from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  authControllers.register
);

authRouter.post("/login", authControllers.login);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.patch("/", authenticate, authControllers.updateSubscription);

authRouter.patch(
  "/avatars",

  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

export default authRouter;
