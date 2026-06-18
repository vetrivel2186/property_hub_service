import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';

export const generateAccessToken =(user:any)=>{
    return jwt.sign({...user }, env.JWT_ACCESS_SECRET, { expiresIn:"1d" });
}

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as { userId: number,name:string,email:string };
};

export const generateRefreshToken = (user:any) => {
  return jwt.sign({...user }, env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { userId: number,name:string,email:string };
};