import multer from "multer";
import type {
  Request,
  Response,
  NextFunction,
} from "express";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      type: "MulterError",
      code: err.code,
      message: err.message,
    });
  }
     console.log(err)
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};