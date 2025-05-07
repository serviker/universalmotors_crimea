import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb"; // путь под себя
import User from "@/models/User";

// Динамическая маршрутизация (если данные часто меняются)
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await connectToDatabase(); // Подключение с кэшированием
        const users = await User.find().select("-password"); // Без пароля

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("❌ Ошибка при получении пользователей:", error);
        return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
    }
}
