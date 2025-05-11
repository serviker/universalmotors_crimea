// lib/auth/getCurrentUser.ts
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        await connectToDatabase();
        const user = await User.findById(decoded.userId).lean();
        return user;
    } catch (err) {
        console.error('Ошибка при верификации токена:', err);
        return null;
    }
}
