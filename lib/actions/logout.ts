'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.set({
        name: 'token',
        value: '',
        path: '/',
        maxAge: 0,
    });

    redirect('/login');
}
