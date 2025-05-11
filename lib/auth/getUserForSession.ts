// lib/auth/getUserForSession.ts

import { IUser } from "@/models/User";
import { ObjectId } from "mongodb";
import { SessionUser } from "@/types/session";

// Эта функция принимает полный объект пользователя (например, из базы) и возвращает только безопасные поля
export function getUserForSession(user: IUser): SessionUser {
    return {
        id: (user._id as ObjectId).toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        emailVerified: user.emailVerified ?? null,
    };
}