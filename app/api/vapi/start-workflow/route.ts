export async function POST(request: Request) {
  try {
    const { userId, userName } = await request.json();

    const res = await fetch("https://api.vapi.ai/call/web", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workflowId: process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID,
        assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID,
        assistantOverrides: {
          variableValues: {
            userId,
            userName,
          },
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to start workflow:", data);
      return new Response(JSON.stringify({ success: false, error: data }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error starting workflow:", error);
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
