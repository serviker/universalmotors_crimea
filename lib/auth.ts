// lib/auth.ts

import { getUserByEmail } from "./users"; // ты сделаешь этот файл
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function signJwt(payload: object) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export async function signIn(email: string, password: string) {
    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return { ok: false };
    }

    const token = signJwt({ userId: user._id });

    const cookieStore = await cookies();
    cookieStore.set({
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    return { ok: true };
}


