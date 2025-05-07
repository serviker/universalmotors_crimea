import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDatabase();
    await mongoose.connection.asPromise(); // Дожидаемся полного подключения

    if (!mongoose.connection.db) {
        console.error("Ошибка: база данных не подключена");
        return NextResponse.json({ error: "Ошибка: база данных не подключена" }, { status: 500 });
    }

    console.log("✅ Подключение к базе данных успешно!");

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📂 Список коллекций:", collections);

    return NextResponse.json({ collections });
}

/* export async function GET() {
    await connectToDatabase();
    await mongoose.connection.asPromise();

    return NextResponse.json({
        status: mongoose.connection.readyState === 1 ? "✅ База данных подключена" : "❌ Ошибка подключения",
        readyState: mongoose.connection.readyState
    });
}*/