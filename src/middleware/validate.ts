import { NextFunction, Request, RequestHandler, Response } from "express";
import { Schema } from "joi";

export function validatedBody(schema: Schema): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Invalid request body", details: error.details });
    }

    next();
  };
}
