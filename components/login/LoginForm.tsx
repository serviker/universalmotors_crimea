'use client';

import { useFormState } from 'react-dom';
import { loginAction, type LoginFormState } from '@/lib/actions/auth';
import styles from './LoginForm.module.css';
import Image from 'next/image';
import Link from 'next/link';

const initialState: LoginFormState = { message: '' };

export default function LoginForm() {
    const [state, formAction] = useFormState(loginAction, initialState);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Image
                    src="/logo.png"
                    alt="Logo"
                    className={styles.logo}
                    width={250}
                    height={110}
                />

                {typeof state === 'object' && state?.message && (
                    <p className={`${styles.message} ${styles.error}`}>
                        {state.message}
                    </p>
                )}

                <form action={formAction} className={styles.form}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Введите Email"
                        className={styles.input}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Введите Пароль"
                        className={styles.input}
                        required
                    />
                    <button type="submit" className={styles.button}>
                        Войти
                    </button>
                </form>

                <div className={styles.link}>
                    <p className={styles.loginName}>
                        Если вы не зарегистрированы{' '}
                        <Link href="/register">Зарегистрироваться</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
