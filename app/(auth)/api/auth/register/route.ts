/*import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            firstName,
            lastName,
            middleName,
            email,
            password,
            phone,
            address,
            role
        }: {
            firstName: string;
            lastName: string;
            middleName?: string;
            email: string;
            password: string;
            phone?: string;
            address?: string;
            role?: string;
        } = body;

        // Проверка обязательных полей
        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json(
                { error: 'Пожалуйста, заполните все обязательные поля.' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Проверка на существующего пользователя
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'Пользователь с таким email уже существует' },
                { status: 400 }
            );
        }

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание пользователя
        const user = new User({
            firstName,
            lastName,
            middleName,
            email,
            password: hashedPassword,
            phone,
            address,
            role
        });

        await user.save();

        return NextResponse.json(
            { message: 'Пользователь успешно зарегистрирован!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        return NextResponse.json({ error: 'Ошибка регистрации' }, { status: 500 });
    }
}*/
