import { NextResponse } from "next/server";
type RuntimeEnv = { MEDIA?: R2Bucket };
const runtime = async () => (await import("cloudflare:workers")).env as unknown as RuntimeEnv;
export async function GET(_request: Request, context: { params: Promise<{ key: string[] }> }) {
  const { key } = await context.params; const objectKey = key.join("/"); const media = (await runtime()).MEDIA;
  if (!media) return NextResponse.json({ error: "Media storage unavailable." }, { status: 503 });
  const object = await media.get(objectKey); if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers(); object.writeHttpMetadata(headers); headers.set("etag", object.httpEtag); headers.set("cache-control", "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
}
