// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: "user" | "manager" | "storekeeper" | "admin";
    createdAt: Date;
    emailVerified: Date | null; // 👈 корректно добавлено поле
}

const UserSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "manager", "storekeeper", "admin"],
        default: "user",
    },
    createdAt: { type: Date, default: Date.now },
    emailVerified: { type: Date, default: null }, // 👈 здесь задаётся значение по умолчанию
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
