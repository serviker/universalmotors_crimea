// lib/actions/auth.ts

'use server';

import { registerUser } from '@/lib/register';
import { signIn} from '@/lib/auth';
import { redirect } from 'next/navigation';

export type LoginFormState = {
    message: string;
    success?: boolean;
};

export async function loginAction(
    _prevState: LoginFormState,
    formData: FormData
): Promise<LoginFormState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await signIn(email, password);

    if (!result.ok) {
        return { message: 'Неверные данные для входа' };
    }
    redirect('/');
   // return { message: '', success: true };
}

export type RegisterFormState = {
    message: string;
    success?: boolean;
};

export async function registerAction(
    _prevState: RegisterFormState,
    formData: FormData
): Promise<RegisterFormState> {
    const data = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        middleName: formData.get('middleName') as string | undefined,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        phone: formData.get('phone') as string | undefined,
        address: formData.get('address') as string | undefined,
        role: formData.get('role') as string | undefined,
    };

    const result = await registerUser(data);

    if (!result.ok) {
        return { message: result.message || 'Ошибка регистрации' };
    }
    redirect('/');
   // return { message: '', success: true };

}



/*import { signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { registerUser } from "@/lib/auth";

export type LoginFormState = {
    message: string;
}

export async function loginAction(
    _prevState: LoginFormState,
    formData: FormData
): Promise<LoginFormState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await signIn(email, password);

    if (!result.ok) {
        return { message: 'Неверные данные для входа' };
    }

    redirect('/');
    return { message: '' }; // формально не будет использоваться, но тип будет всегда LoginFormState
}


export type RegisterFormState = {
    message: string;
};

export async function registerAction(
    _prevState: RegisterFormState,
    formData: FormData
): Promise<RegisterFormState> {
    const data = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        middleName: formData.get('middleName') as string | undefined,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        phone: formData.get('phone') as string | undefined,
        address: formData.get('address') as string | undefined,
        role: formData.get('role') as string | undefined,
    };

    const result = await registerUser(data);

    if (!result.ok) {
        return { message: result.message || 'Ошибка регистрации' };
    }

    redirect('/');
}*/
