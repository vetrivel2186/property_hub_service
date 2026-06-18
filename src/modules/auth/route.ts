import { Router } from "express";
import { register, login, refresh, logout } from "./controller.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/refresh", refresh);
authRoutes.post("/logout", logout);

export default authRoutes;