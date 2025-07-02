import { NextRequest } from "next/server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { auth } from "@/firebase/admin";
import { User } from "@/types";

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


export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

const user = await getCurrentUser();


export async function GET() {
  return Response.json({ success: true, data: "Thank You" }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { type, role, level, techstack, amount } = await request.json();

  if (!user || !user.id) {
    return Response.json(
      { success: false, error: "Unauthorized user" },
      { status: 401 }
    );
  }

  

  try {
    const { text: questions } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: `
        Generate interview questions for the following job description, and return ONLY the questions in format like this: [question1, question2, question3].
        Job Type: ${type}
        Role: ${role}
        Level: ${level}
        Tech Stack: ${techstack}
        Number of Questions: ${amount}
      `,
    });

    const interview = {
      role,
      type,
      level,
      techstack: (techstack ?? "").split(","),
      questions: JSON.parse(questions),
      userId: user.id,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json(
      { success: true, interview },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (e) {
    console.error(e);
    return Response.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
