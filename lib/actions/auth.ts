// lib/actions/auth.ts
'use server';

import { signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';

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