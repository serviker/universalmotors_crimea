// lib/users.ts
import { connectToDatabase } from "./mongodb";
import UserModel from "@/models/User"; // путь к твоей mongoose модели

export async function getUserByEmail(email: string) {
    await connectToDatabase();
    return await UserModel.findOne({ email });
}
