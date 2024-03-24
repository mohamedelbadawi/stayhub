import { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => RequestHandler;

export const asyncHandler: AsyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
