import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { RefreshTokens } from "../../db/schema/refresh-token.schema.js";
import { users } from "../../db/schema/user.schema.js";
import type { registerUserInp } from "./type.js";

export const insertUser = async (body: registerUserInp) => {
    const res = await db.insert(users).values(body).returning();
    if (!res[0]) {
        throw new Error("User insert failed");
    }
    return res[0];
}

export const saveRefreshToken = async (userId: number, token: string, expiresAt: Date) => {
    return await db.insert(RefreshTokens).values({
        userId, token, expiresAt
    })
}

export const deleteRefreshToken = async (token: string) => {
    return await db.delete(RefreshTokens).where(eq(RefreshTokens.token, token))
}

export const findRefreshToken = async (token: string) => {
    const res = await db.select().from(RefreshTokens).where(eq(RefreshTokens.token, token)).limit(1);
    return res[0];
}

export const findUserByEmail = async (email: string) => {
    const res = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return res[0];
}   
