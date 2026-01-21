'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const COOKIE_NAME = 'admin_session';

export async function login(formData: FormData) {
    const password = formData.get('password') as string;

    if (password === ADMIN_PASSWORD) {
        (await cookies()).set(COOKIE_NAME, 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });
        redirect('/admin/dashboard');
    } else {
        return { error: 'Invalid password' };
    }
}

export async function logout() {
    (await cookies()).delete(COOKIE_NAME);
    redirect('/admin/login');
}

// Data Management Actions
import { db } from '@/lib/firebase/config';
import { doc, updateDoc, deleteDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';

export async function markAsRead(id: string) {
    try {
        await updateDoc(doc(db, 'contact_submissions', id), {
            status: 'read'
        });
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Error marking as read:', error);
        return { error: 'Failed to update status' };
    }
}

export async function deleteSubmission(id: string) {
    try {
        await deleteDoc(doc(db, 'contact_submissions', id));
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Error deleting submission:', error);
        return { error: 'Failed to delete submission' };
    }
}
