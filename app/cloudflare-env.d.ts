declare interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<unknown>;
}
declare interface D1Database { prepare(query: string): D1PreparedStatement; }
declare interface R2ObjectBody {
  body: ReadableStream;
  httpEtag: string;
  writeHttpMetadata(headers: Headers): void;
}
declare interface R2Bucket {
  put(key: string, value: ReadableStream | ArrayBuffer | string, options?: unknown): Promise<unknown>;
  get(key: string): Promise<R2ObjectBody | null>;
}
declare module "cloudflare:workers" { export const env: Record<string, unknown>; }
