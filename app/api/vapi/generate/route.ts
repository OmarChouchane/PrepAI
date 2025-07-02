import { NextRequest } from "next/server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

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

export async function GET() {
  return Response.json({ success: true, data: "Thank You" }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { type, role, level, techstack, amount, userId } = await request.json();



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
      userId: userId,
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
