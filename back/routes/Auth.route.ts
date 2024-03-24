import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  forgetPasswordValidatorSchema,
  loginValidatorSchema,
  registerValidatorSchema,
  resetPasswordValidatorSchema,
} from "../validators/Auth.validators";
import { validate } from "../middlewares/validator";
import AuthController from "../controllers/Auth.controller";
import { isAuth } from "../middlewares/Auth";

const authRoutes = Router();

authRoutes.post(
  "/register",
  checkSchema(registerValidatorSchema),
  validate,
  AuthController.register
);
authRoutes.post(
  "/login",
  checkSchema(loginValidatorSchema),
  validate,
  AuthController.login
);
authRoutes.post(
  "/forget-password",
  checkSchema(forgetPasswordValidatorSchema),
  validate,
  AuthController.forgetPassword
);
authRoutes.post(
  "/reset-password/:id",
  checkSchema(resetPasswordValidatorSchema),
  validate,
  AuthController.resetPassword
);
authRoutes.get("/profile", isAuth, AuthController.getProfile);
authRoutes.post("/refresh", AuthController.refresh);

export default authRoutes;
