import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[Error] ${new Date().toISOString()}:`, err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation Error",
      details: err.errors.map((e) => ({ path: e.path, message: e.message })),
    });
  }

  const statusCode = err.message === "User not found" ? 404 : 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ error: message });
};
