type RuntimeEnv = { ADMIN_PASSWORD?: string; ADMIN_SESSION_SECRET?: string };
const runtime = async () => { try { return (await import("cloudflare:workers")).env as unknown as RuntimeEnv; } catch { return {} as RuntimeEnv; } };
export const ADMIN_COOKIE = "sp_admin_session";
const encoder = new TextEncoder();
const hex = (buffer: ArrayBuffer) => [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
const config = async () => { const bound = await runtime(); return { password: bound.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD, secret: bound.ADMIN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET }; };
async function signature(value: string) { const { secret } = await config(); if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured."); const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]); return hex(await crypto.subtle.sign("HMAC", key, encoder.encode(value))); }
const cookieValue = (request: Request, name: string) => request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1);
export async function createAdminSession() { const expires = Date.now() + 1000 * 60 * 60 * 12; return `${expires}.${await signature(String(expires))}`; }
export async function isAdmin(request: Request) { const token = cookieValue(request, ADMIN_COOKIE); if (!token) return false; const [expires, supplied] = token.split("."); if (!expires || !supplied || Number(expires) < Date.now()) return false; return supplied === await signature(expires); }
export async function passwordMatches(password: string) { const { password: expected } = await config(); return Boolean(expected) && password === expected; }
export const sessionCookie = (token: string) => `${ADMIN_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=43200`;
export const clearSessionCookie = `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
