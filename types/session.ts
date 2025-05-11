// types/session.ts

export interface SessionUser {
    id: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    phone: string;
    address: string;
    role: "user" | "manager" | "storekeeper" | "admin";
    emailVerified: Date | null;
}

export interface Session {
    user: SessionUser;
    expires?: string;
}
