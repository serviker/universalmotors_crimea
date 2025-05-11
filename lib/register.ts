// lib/register.ts
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./mongodb";
import User from "@/models/User";

export async function registerUser(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    middleName?: string;
    phone?: string;
    address?: string;
    role?: string;
}): Promise<{ ok: boolean; message?: string }> {
    const { email, password } = data;

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return { ok: false, message: "Пользователь с таким email уже существует" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        ...data,
        password: hashedPassword,
    });

    await newUser.save();

    return { ok: true };
}
