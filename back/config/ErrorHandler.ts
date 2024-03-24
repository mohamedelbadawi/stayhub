import { NextFunction, Request, Response } from "express";

const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  const errors = [
    {
      message: errMsg,
      status: errStatus,
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    },
  ];
  res.status(errStatus).json({
    success: false,
    errors,
  });
};

export default ErrorHandler;
