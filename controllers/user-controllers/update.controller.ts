import { NextFunction, Request, Response } from "express";

 const updateUserController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};

export default updateUserController