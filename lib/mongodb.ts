// lib/mongodb.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

console.log("🔐 URI MongoDB:", MONGODB_URI);

if (!MONGODB_URI) {
    throw new Error("❌ Переменная окружения MONGODB_URI не задана!");
}

// ✅ Расширение глобального объекта для кэширования подключения
declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
}

// 📦 Инициализация кеша, если ещё не было
global.mongooseCache ||= {
    conn: null,
    promise: null,
};

const cached = global.mongooseCache;

export async function connectToDatabase() {
    if (cached.conn) {
        if (process.env.NODE_ENV === "development") {
            console.log("📦 Используем кэшированное подключение MongoDB");
        }
        return cached.conn;
    }

    if (!cached.promise) {
        if (process.env.NODE_ENV === "development") {
            console.log("⏳ Подключение к MongoDB...");
        }

        cached.promise = mongoose.connect(MONGODB_URI!).then((mongooseInstance) => {
            if (process.env.NODE_ENV === "development") {
                console.log("✅ Успешно подключено к MongoDB!");
            }
            return mongooseInstance;
        }).catch((error) => {
            console.error("❌ Ошибка подключения к MongoDB:", error);
            throw error; // не выходим process.exit, чтобы можно было отловить ошибку на клиенте или сервере
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}


/*if (!MONGODB_URI) {
    throw new Error("❌ Переменная окружения MONGODB_URI не задана!");
}

// 🔧 Расширяем глобальный объект (один раз в проекте)
declare global {
    // eslint-disable-next-line no-var
    var mongoose: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
    } | undefined;
}

// ⛔️ Убедимся, что global.mongoose инициализирован
if (!global.mongoose) {
    global.mongoose = {
        conn: null,
        promise: null,
    };
}

const cached = global.mongoose;

export async function connectToDatabase() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        console.log("⏳ Подключение к MongoDB...");

        cached.promise = mongoose
            .connect(MONGODB_URI)
            .then((mongoose) => {
                console.log("✅ Успешное подключение к MongoDB!");
                return mongoose.connection.asPromise();
            })
            .catch((error) => {
                console.error("❌ Ошибка подключения к MongoDB:", error);
                process.exit(1);
            });
    }

    cached.conn = await cached.promise;

    if (cached.conn.db) {
        console.log("✅ База данных подключена:", cached.conn.db.databaseName);
    } else {
        console.error("❌ Ошибка: База данных не подключена.");
    }

    return cached.conn;
}*/
