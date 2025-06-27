'use server'

import { db, auth } from '@/firebase/admin';
import { cookies } from 'next/headers';

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000; // 1 week in milliseconds

export async function signUp(params: SignUpParams){
    const { uid, name, email} = params;

    try {

        const userRecord = await db.collection('users').doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: 'User already exists.  Please log in instead.'
            };  
        }

        await db.collection('users').doc(uid).set({
            name,
            email,
        });

        return {
            success: true,
            message: 'User created successfully. Please sign in.'
        };
    } catch (e: any) {
        console.error('Error creating a user', e);

        if(e.code === 'auth/email-already-exists'){
            return {
                success: false,
                message: 'Email already exists. Please use a different email.'
            }
        }

        return {
            success: false,
            message: 'An error occurred while creating the user. Please try again later.'
        }
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try {

        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return {
                success: false,
                message: 'User not found. Please sign up first.'
            };
        }

        await setSessionCookie(idToken);

        return {
            success: true,
            message: 'Signed in successfully.'
        };
        
    } catch (error) {
        console.error('Error signing in', error);
        return {
            success: false,
            message: 'An error occurred while signing in. Please try again later.'
        }
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();
    const sessionCookies = await auth.createSessionCookie(idToken, {
      expiresIn: ONE_WEEK
    });

    cookieStore.set({
        name: 'session',
        value: sessionCookies,
        httpOnly: true,
        maxAge: ONE_WEEK,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if (!userRecord.exists) {
            return null;
        }

        return {
            ...userRecord.data(),
            id: decodedClaims.uid,
        }as User;

        
    } catch (error) {
        console.error('Error getting current user', error);
        return null;
    }
}

export async function isAuthenticated(): Promise<boolean> {

    const user = await getCurrentUser();
    return !!user;
}   