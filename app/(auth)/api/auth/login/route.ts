// /app/(site)/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import User from "@/models/User";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function POST(req: NextRequest) {
    await connectToDatabase(); // Подключение к MongoDB (один раз)

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ error: "Неверный email или пароль" }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: '7d',
    });

    const response = NextResponse.json({ success: true });

    response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 дней
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    return response;
}
