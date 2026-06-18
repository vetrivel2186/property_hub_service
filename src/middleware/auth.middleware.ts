import type{ Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }
   console.log("Authorization header:", authHeader);
    const token = authHeader  ;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    const decoded = jwt.verify(
      token,
      env.JWT_ACCESS_SECRET
    ) as {
      userId: number;
      email: string;
      name:string
    };

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};