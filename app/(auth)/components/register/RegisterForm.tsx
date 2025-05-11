'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useFormState } from 'react-dom';
import styles from '@/app/(auth)/components/register/RegisterForm.module.css';
import { RegisterFormProps } from '@/app/(auth)/components/register/RegisterForm.props';
import { registerAction } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]{6,}$/;

const formatPhoneNumber = (input: string) => {
    const numbers = input.replace(/\D/g, '');
    let formatted = '+';
    if (numbers.length > 0) formatted += numbers.slice(0, 1);
    if (numbers.length > 1) formatted += `(${numbers.slice(1, 4)}`;
    if (numbers.length > 4) formatted += `)${numbers.slice(4, 7)}`;
    if (numbers.length > 7) formatted += `-${numbers.slice(7, 9)}`;
    if (numbers.length > 9) formatted += `-${numbers.slice(9, 11)}`;
    return formatted;
};

const RegisterForm = ({}: RegisterFormProps) => {
    const [passwordError, setPasswordError] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formState, formAction] = useFormState(registerAction, { message: '' });
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting && formState) {
            setIsSubmitting(false);
        }
        if (formState.success) {
            router.push('/'); // Редирект на главную
        }
    }, [formState]);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (!passwordRegex.test(value)) {
            setPasswordError('Пароль должен быть не менее 6 символов, содержать строчные и заглавные буквы, только английские буквы и цифры');
        } else {
            setPasswordError('');
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(formatPhoneNumber(e.target.value));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Image src="/logo.png" alt="Logo" className={styles.logo} width={250} height={110} />

                {formState.message && <p className={`${styles.message} ${styles.error}`}>{formState.message}</p>}
                {passwordError && <p className={`${styles.message} ${styles.error}`}>{passwordError}</p>}

                <form className={styles.form} action={formAction} onSubmit={() => setIsSubmitting(true)}>
                    <input type="text" name="lastName" placeholder="Фамилия" className={styles.input} required />
                    <input type="text" name="firstName" placeholder="Имя" className={styles.input} required />
                    <input type="text" name="middleName" placeholder="Отчество" className={styles.input} />
                    <input type="email" name="email" placeholder="Email" className={styles.input} required />
                    <input type="password" name="password" placeholder="Пароль" className={styles.input} onChange={handlePasswordChange} required />
                    <input type="tel" name="phone" value={phone} onChange={handlePhoneChange} placeholder="+X(XXX)XXX-XX-XX" className={styles.input} maxLength={16} />
                    <input type="text" name="address" placeholder="Адрес" className={styles.input} />
                    <select name="role" className={styles.input} required defaultValue="user">
                        <option value="user">Пользователь</option>
                        <option value="manager">Менеджер</option>
                        <option value="storekeeper">Кладовщик</option>
                        <option value="admin">Администратор</option>
                    </select>

                    <button type="submit" className={styles.button} disabled={isSubmitting}>
                        {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
                    </button>
                </form>

                <div className={styles.link}>
                    <p className={styles.registrationName}>
                        Уже есть аккаунт? <a href="/login">Войти</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
