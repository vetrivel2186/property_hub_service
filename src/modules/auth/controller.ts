import type { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "./service.js";

export const register = async (req: Request, res: Response) => {
    console.log("Registering user with data:", req.body);
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }   
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const result = await refreshAccessToken(req.body.refreshToken);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await logoutUser(req.body.refreshToken);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};