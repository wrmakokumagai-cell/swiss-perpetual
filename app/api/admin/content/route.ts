import { NextResponse } from "next/server";
import { isAdmin } from "../../../../lib/adminAuth";
import { readSiteContent, writeSiteContent } from "../../../../lib/contentStore";
import type { SiteContent } from "../../../content/types";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  if (!(await isAdmin(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await readSiteContent());
}
export async function PUT(request: Request) {
  if (!(await isAdmin(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const content = await request.json() as SiteContent;
  if (!content?.home || !Array.isArray(content.brands)) return NextResponse.json({ error: "Invalid content." }, { status: 400 });
  await writeSiteContent(content);
  return NextResponse.json({ ok: true });
}
