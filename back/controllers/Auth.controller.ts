import bcrypt from "bcryptjs";
import { IUser } from "../models/user.model";
import { authServices } from "../services/auth.services";
import { asyncHandler } from "./../config/AsyncHandler";
import { NextFunction, Request, Response } from "express";
import ApiError from "../config/ApiError";
import jwt from "jsonwebtoken";
import { emailQueue } from "../utils/QueueWorker";

type userDataPayload = { email: string; role: string; id: string };

class AuthController {
  static register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, password, email, phone } = req.body;

      const userData = { name, password, email, phone } as IUser;
      const isExists = await authServices.getUserByEmail(email);
      if (isExists) {
        return next(new ApiError("user already exists", 400));
      }
      await authServices.createUser(userData);
      return res.json({ message: "User Created successfully" });
    }
  );
  static login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      const user = await authServices.getUserByEmail(email);
      if (!user) {
        return next(new ApiError("there is no user with this email ", 404));
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return next(new ApiError("password is incorrect ", 404));
      }
      const userData = {
        email: user.email,
        id: user._id,
      } as userDataPayload;
      const accessToken = authServices.generateJwtToken(userData, "15m");
      const refreshToken = authServices.generateJwtToken(userData, "7d");
      res.cookie("refresh_token", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });

      return res.json({
        message: "Login successfully",
        user: { id: user.id, name: user.name, email: user.email },
        token: accessToken,
      });
    }
  );
  static refresh = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const refreshToken = req.cookies.refresh_token;

      if (!refreshToken) {
        return next(new ApiError("Invalid User,please login", 400));
      }
      const payload = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET as string
      );
      if (!payload) {
        return next(new ApiError("Invalid User", 400));
      }
      const accessToken = authServices.generateJwtToken(
        payload as userDataPayload,
        "15m"
      );
      return res.json({ token: accessToken });
    }
  );

  static forgetPassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email } = req.body;
      const user = await authServices.getUserByEmail(email);
      if (!user) {
        return next(new ApiError("Invalid", 400));
      }
      const token = authServices.generateResetToken().toString();
      const tokenExp = new Date(Date.now() + 600000);
      await authServices.updateUserWithToken(user._id, token, tokenExp);
      const link = `${process.env.FRONT_BASE_URL}reset-password/${user._id}`;
      emailQueue.add({
        email: user.email,
        subject: "reset your password",
        template: "reset-email.ejs",
        data: { name: user.name, token: token, link: link },
      });
      return res.json({ message: "Check your email" });
    }
  );

  static resetPassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { password, token } = req.body;
      const { id } = req.params;

      const user = await authServices.getUserById(id);
      if (!user) {
        return next(new ApiError("Invalid User ", 400));
      }

      if (user?.resetToken.localeCompare(token)) {
        return next(new ApiError("invalid token", 400));
      }
      const currentTime = new Date(Date.now());
      if (currentTime > user?.resetTokenExp) {
        return next(new ApiError("token expired", 400));
      }
      const hashed = await bcrypt.hash(password, 10);
      await authServices.updateUser(user._id, {
        password: hashed,
        resetToken: "",
        resetTokenExp: null,
      });
      return res.json({ message: "password updated successfully" });
    }
  );
  static getProfile = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = (req.headers.authorization as string).split(" ")[1];
      const payload = authServices.decodeToken(token);
      const user = await authServices.getUserById(
        payload.id,
        "name email phone"
      );

      return res.json({
        user,
      });
    }
  );
}
export default AuthController;
