import { NextFunction, Request, Response } from "express";

 const deleteUserController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};

export default deleteUserController