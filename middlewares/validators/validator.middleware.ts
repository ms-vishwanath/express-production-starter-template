import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateBody =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next(); 
    } catch (error: any) {
      res.status(400).json({
        message: "Validation error",
        details: error.errors,
      });
    }
  };
