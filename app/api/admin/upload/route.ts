import { NextResponse } from "next/server";
import { isAdmin } from "../../../../lib/adminAuth";
type RuntimeEnv = { MEDIA?: R2Bucket; DB?: D1Database };
const runtime = async () => (await import("cloudflare:workers")).env as unknown as RuntimeEnv;
export async function POST(request: Request) {
  if (!(await isAdmin(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const bindings = await runtime();
  if (!bindings.MEDIA) return NextResponse.json({ error: "Media storage unavailable." }, { status: 503 });
  const data = await request.formData(); const file = data.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image or video." }, { status: 400 });
  const safe = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-"); const key = `${Date.now()}-${crypto.randomUUID()}-${safe}`;
  await bindings.MEDIA.put(key, file.stream(), { httpMetadata: { contentType: file.type || "application/octet-stream" } });
  if (bindings.DB) { await bindings.DB.prepare(`CREATE TABLE IF NOT EXISTS media_assets (id TEXT PRIMARY KEY, filename TEXT NOT NULL, content_type TEXT NOT NULL, size INTEGER NOT NULL, created_at INTEGER NOT NULL)`).run(); await bindings.DB.prepare("INSERT INTO media_assets (id, filename, content_type, size, created_at) VALUES (?, ?, ?, ?, ?)").bind(key, file.name, file.type, file.size, Date.now()).run(); }
  return NextResponse.json({ url: `/api/media/${encodeURIComponent(key)}` });
}
