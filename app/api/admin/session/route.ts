import { NextResponse } from "next/server";
import { isAdmin } from "../../../../lib/adminAuth";
export const dynamic = "force-dynamic";
export async function GET(request: Request) { return NextResponse.json({ authenticated: await isAdmin(request) }); }
