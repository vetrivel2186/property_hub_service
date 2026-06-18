import bcrypt from "bcryptjs";
import {
    findUserByEmail,
    saveRefreshToken,
    findRefreshToken,
    deleteRefreshToken,
    insertUser,
} from "./repository.js";

import {
    generateAccessToken,
    generateRefreshToken,
} from "./utils.js";

export const registerUser = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    const existing = await findUserByEmail(data.email);

    if (existing) throw new Error("Email already exists");

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await insertUser({
        name: data.name,
        email: data.email,
        passwordHash,
    });

    let userData = {
        userId: user.id,
        name: user.name,
        email: user.email
    }

    const accessToken = generateAccessToken(userData);
    const refreshToken = generateRefreshToken(userData);

    await saveRefreshToken(
        user.id,
        refreshToken,
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );

    return { user, accessToken, refreshToken };
};

export const loginUser = async (data: {
    email: string;
    password: string;
}) => {
    const user = await findUserByEmail(data.email);

    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(data.password, user.passwordHash);

    if (!match) throw new Error("Invalid credentials");
    let userData = {
        userId: user.id,
        name: user.name,
        email: user.email
    }
    const accessToken = generateAccessToken(userData);
    const refreshToken = generateRefreshToken(userData);

    await saveRefreshToken(
        user.id,
        refreshToken,
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );

    return { user, accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken: string) => {
    const stored = await findRefreshToken(refreshToken);

    if (!stored) throw new Error("Invalid refresh token");

    const accessToken = generateAccessToken(stored.userId);

    return { accessToken };
};

export const logoutUser = async (refreshToken: string) => {
    await deleteRefreshToken(refreshToken);
};