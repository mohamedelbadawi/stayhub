import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../config/ApiError";
require("dotenv").config();

export interface authRequest extends Request {
  userData?: any;
}
const decodeToken = (token: string) => {
  const verified = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayload;
  return verified;
};
const isAuth = async (req: authRequest, res: Response, next: NextFunction) => {
  try {
    // get the token
    const token = (req.headers.authorization as string).split(" ")[1];
    if (!token) {
      console.log("here");
      return next(new ApiError("You can't access this route", 400));
    }
    // verify token
    const payload = decodeToken(token);
    if (payload.exp != undefined) {
      const date = new Date(payload.exp * 1000);
      if (Date.now() > date.getTime()) {
        return next(new ApiError("invalid Token", 400));
      }
    }
    req.userData = payload;
    next();
  } catch (error: any) {
    return next(new ApiError("Invalid token", error.statusCode));
  }
};

// const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
//   const token = (req.headers.authorization as string).split(" ")[1];
//   // verify token
//   const payload = decodeToken(token);
//   if (payload === null || payload.role !== "admin") {
//     return next(new ApiError("you can't access this route", 201));
//   }
//   next();
// };

export { isAuth };
