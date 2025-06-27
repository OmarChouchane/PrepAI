'use server'

import { db } from '@/firebase/admin';

export async function SignUp(params: SignUpParams){
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