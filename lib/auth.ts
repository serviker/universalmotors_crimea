// lib/auth.ts

import { Auth } from "@auth/core";
import Credentials from "@auth/core/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./mongodb";
import User, { IUser } from "@/models/User";
//import { ObjectId } from "mongodb";
import { getUserForSession } from "./auth/getUserForSession";
import { SessionUser } from "@/types/session";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function authHandler(req: Request) {
    return await Auth(req, {
        providers: [
            Credentials({
                name: "Credentials",
                credentials: {
                    email: { label: "Email", type: "email" },
                    password: { label: "Password", type: "password" },
                },
                async authorize(credentials) {
                    const email = credentials?.email as string;
                    const password = credentials?.password as string;

                    if (!email || !password) {
                        throw new Error("Email and password are required");
                    }

                    await connectToDatabase();
                    const user: IUser | null = await User.findOne({ email });

                    if (!user || !bcrypt.compareSync(password, user.password)) {
                        throw new Error("Invalid email or password");
                    }

                    return getUserForSession(user); // безопасная сессия
                }
            }),
        ],
        session: {
            strategy: "jwt",
            maxAge: 60 * 60 * 24 * 7,
        },
        jwt: {
            maxAge: 60 * 60 * 24 * 7,
        },
        callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    token.user = user as SessionUser;
                }
                return token;
            },
            async session({ session, token }) {
                session.user = token.user as SessionUser;
                return session;
            },
        },
        secret: JWT_SECRET,
        pages: {
            signIn: "/login",
        },
    });
}



export async function signIn(email: string, password: string): Promise<{ ok: boolean; message?: string; user?: IUser }> {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
        return { ok: false, message: "Пользователь не найден" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return { ok: false, message: "Неверный пароль" };
    }

    return { ok: true, user };
}

/*import { getUserByEmail } from "./users"; // ты сделаешь этот файл
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectToDatabase } from './mongodb';
import User from '@/models/User';

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


export async function registerUser(data: {
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    role?: string;
}): Promise<{ ok: boolean; message?: string }> {
    const { email, password } = data;

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return { ok: false, message: 'Пользователь с таким email уже существует' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        ...data,
        password: hashedPassword,
    });

    await newUser.save();

    const token = signJwt({ userId: newUser._id });

    const cookieStore = await cookies();
    cookieStore.set({
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    return { ok: true };
}*/

