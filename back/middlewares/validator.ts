import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsData = errors.array().map((error) => {
      return {
        message: error.msg,
      };
    });
    return res.status(400).json({ success: false, errors: errorsData });
  }
  next();
};
