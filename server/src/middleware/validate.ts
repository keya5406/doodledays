import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({
        message: "Validation failed",
        errors: err.errors || err,
      });
    }
  };
};
