import { successResponse } from "@/helpers/responder.helper";
import { CreateUserInputType } from "@/middlewares/validators/user.validation";
import { NextFunction, Request, Response } from "express";
const createUserController = (
  req: Request<unknown, unknown, CreateUserInputType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, password } = req.body;

    return successResponse(res);
  } catch (error) {
    next(error);
  }
};

export default createUserController;
