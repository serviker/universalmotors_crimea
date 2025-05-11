"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/components/topMenu/topmenu.module.css";
import { Session } from "@/types/session";

export const TopMenu = () => {
    const router = useRouter();
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSession() {
            try {
                const res = await fetch("/api/session");
                if (!res.ok) throw new Error("Не удалось получить сессию");
                const data: Session = await res.json();
                if (data?.user) {
                    setSession(data);
                }
            } catch (error) {
                console.error("Ошибка при получении сессии:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchSession();
    }, []);

    const user = session?.user;
    const isAdmin = user?.role === "admin";

    return (
        <div className={styles.topmenu}>
            <ul className={styles.topmenuList}>
                <li><Link href="/#">Главная</Link></li>
                <li><Link href="/#about">О компании</Link></li>
                <li><Link href="/#news">Новости</Link></li>
                <li><Link href="/#payment">Оплата</Link></li>
                <li><Link href="/#credit">Кредит</Link></li>
                <li><Link href="/#delivery">Доставка</Link></li>
                <li><Link href="/#pawnshop">Мото-Ломбард</Link></li>
                <li><Link href="/#school">Школа</Link></li>
                <li><Link href="/#service">Ремонт</Link></li>
                <li><Link href="/#contacts">Контакты</Link></li>
                <li><Link href="/#rental">Аренда и прокат</Link></li>
            </ul>

            <div className={styles.topmenuButtons}>
                {!loading && user ? (
                    <>
                        {user.role === "storekeeper" && (
                            <button onClick={() => router.push("/warehouse")} className={styles.topmenuButton}>
                                Склад
                            </button>
                        )}
                        {user.role === "manager" && (
                            <button onClick={() => router.push("/users")} className={styles.topmenuButton}>
                                Менеджмент
                            </button>
                        )}
                        {isAdmin && (
                            <>
                                <button onClick={() => router.push("/users")} className={styles.topmenuButton}>
                                    Менеджмент
                                </button>
                                <button onClick={() => router.push("/seo")} className={styles.seoButton}>
                                    SEO
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <button onClick={() => router.push("/login")} className={styles.topmenuButton}>
                        Вход
                    </button>
                )}
            </div>
        </div>
    );
};
