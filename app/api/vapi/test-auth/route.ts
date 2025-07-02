// /app/api/vapi/test-auth/route.ts

import { getCurrentUser } from "@/lib/actions/auth.action";

export async function GET() {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    return Response.json(
      { success: false, error: "Unauthorized user" },
      { status: 401 }
    );
  }

  return Response.json({ success: true, user }, { status: 200 });
}
