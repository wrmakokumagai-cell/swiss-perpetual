import { NextResponse } from "next/server";
import { createAdminSession, passwordMatches, sessionCookie } from "../../../../lib/adminAuth";
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { password?: string };
  if (!body.password || !(await passwordMatches(body.password))) return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.headers.set("Set-Cookie", sessionCookie(await createAdminSession()));
  return response;
}

