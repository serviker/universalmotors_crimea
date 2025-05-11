// lib/session.ts
import { cookies } from "next/headers";
import { Session } from "@/types/session";

export function getSession(): Session | null {
    const sessionCookie = cookies().get("session")?.value;
    if (!sessionCookie) return null;

    try {
        return JSON.parse(sessionCookie) as Session;
    } catch {
        return null;
    }
}