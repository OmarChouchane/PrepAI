"use server";
import { GetLatestInterviewsParams, SignInParams, SignUpParams, User } from "@/types";
import { FirebaseError } from "firebase/app";
import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { Interview } from "@/types/";

const SESSION_COOKIE_EXPIRES_IN = 60 * 60 * 24 * 7 * 1000; // 7 days

export const signUp = async (params: SignUpParams) => {
  const { uid, email, name } = params;
  try {
    const user = await db.collection("users").doc(uid).get();

    if (user.exists) {
      return { success: false, message: "User already exists" };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.error(`Error signing up user ${uid}: ${(error as Error)?.message}`);

    if (error instanceof FirebaseError) {
      if (error.code === "auth/email-already-in-use") {
        return { success: false, message: "Email already in use" };
      }
    }

    return { success: false, message: "Something went wrong" };
  }
};

export const signIn = async (params: SignInParams) => {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return { success: false, message: "User not found" };
    }

    await setSessionCookie(idToken);

    return { success: true, message: "User signed in successfully" };
  } catch (error) {
    console.error(
      `Error signing up user ${email}: ${(error as Error)?.message}`
    );

    if (error instanceof FirebaseError) {
      if (error.code === "auth/invalid-credential") {
        return { success: false, message: "Invalid credentials" };
      }
    }

    return { success: false, message: "Something went wrong" };
  }
};

export const setSessionCookie = async (idToken: string) => {
  try {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_COOKIE_EXPIRES_IN,
    });

    cookieStore.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_COOKIE_EXPIRES_IN,
      sameSite: "lax",
      path: "/",
    });

    return { success: true, message: "Session cookie set successfully" };
  } catch (error) {
    console.error(`Error setting session cookie: ${(error as Error)?.message}`);
    return { success: false, message: "Error setting session cookie" };
  }
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();

  const session = cookieStore.get("session");

  if (!session) {
    return null;
  }
  const token = await auth.verifySessionCookie(session.value, true);

  const user = await db.collection("users").doc(token.uid).get();

  if (!user.exists) {
    return null;
  }

  return {
    ...user.data(),
    id: user.id,
  } as User;
};

export async function isAuthenticated() {
  try {
    const user = await getCurrentUser();

    return !!user;
  } catch (error) {
    console.error(
      `Error checking authentication: ${(error as Error)?.message}`
    );
    return false;
  }
}


export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function GetLatestInterviews(
  params: GetLatestInterviewsParams ): Promise<Interview[] | null> {

    const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}