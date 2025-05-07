'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '@/components/register/RegisterForm.module.css';
import { RegisterFormProps } from '@/components/register/RegisterForm.props';

const formatPhoneNumber = (input: string) => {
    const numbers = input.replace(/\D/g, '');
    let formatted = `+${numbers.slice(0, 1)}`;

    if (numbers.length > 1) formatted += `(${numbers.slice(1, 4)}`;
    if (numbers.length > 4) formatted += `)${numbers.slice(4, 7)}`;
    if (numbers.length > 7) formatted += `-${numbers.slice(7, 9)}`;
    if (numbers.length > 9) formatted += `-${numbers.slice(9, 11)}`;

    return formatted;
};

const RegisterForm = ({}: RegisterFormProps) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('user');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]{6,}$/;

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);

        if (!passwordRegex.test(value)) {
            setPasswordError(
                'Пароль должен быть не менее 6 символов, содержать строчные и заглавные буквы, только английские буквы и цифры'
            );
        } else {
            setPasswordError('');
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(formatPhoneNumber(e.target.value));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!passwordRegex.test(password)) {
            setPasswordError('Невалидный пароль');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    middleName,
                    lastName,
                    email,
                    password,
                    phone,
                    address,
                    role,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // ✅ Автоматический логин после регистрации
                const loginResponse = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                if (loginResponse.ok) {
                    router.push('/');
                } else {
                    setSuccessMessage('Регистрация успешна. Выполните вход вручную.');
                    router.push('/login');
                }
            } else {
                const error = data.error || 'Ошибка регистрации';
                setErrorMessage(error);
            }
        } catch (err) {
            console.error('Ошибка при регистрации:', err);
            setErrorMessage('Ошибка при отправке запроса');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Image src="/logo.png" alt="Logo" className={styles.logo} width={250} height={110} />

                {errorMessage && <p className={`${styles.message} ${styles.error}`}>{errorMessage}</p>}
                {successMessage && <p className={`${styles.message} ${styles.success}`}>{successMessage}</p>}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Фамилия" className={styles.input} required />
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Имя" className={styles.input} required />
                    <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} placeholder="Отчество" className={styles.input} />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={styles.input} required />
                    <input type="password" value={password} onChange={handlePasswordChange} placeholder="Пароль" className={styles.input} required />
                    {passwordError && <p className={`${styles.message} ${styles.error}`}>{passwordError}</p>}
                    <input type="tel" value={phone} onChange={handlePhoneChange} placeholder="+X(XXX)XXX-XX-XX" className={styles.input} maxLength={16} />
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Адрес" className={styles.input} />
                    <select value={role} onChange={(e) => setRole(e.target.value)} className={styles.input} required>
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
