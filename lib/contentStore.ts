import { defaultSiteContent } from "../app/content/defaults";
import type { ManagedBrand, SiteContent } from "../app/content/types";
import { normalizeProductSlugs } from "../app/content/slugs";
type RuntimeEnv = { DB?: D1Database };
const runtime = async () => (await import("cloudflare:workers")).env as unknown as RuntimeEnv;
async function ensureTable(db: D1Database) { await db.prepare(`CREATE TABLE IF NOT EXISTS site_content (id TEXT PRIMARY KEY, payload TEXT NOT NULL, updated_at INTEGER NOT NULL)`).run(); }

function normalizeBrand(brand: ManagedBrand & { featuredLogo?: string }): ManagedBrand {
  const { featuredLogo: _legacyFeaturedLogo, ...current } = brand;
  const families = current.families?.length ? current.families : ["Collection"];
  const seededBrand = defaultSiteContent.brands.find((item) => item.slug === current.slug);
  const rawProducts = (current.products ?? []).map((product) => {
    const seed = seededBrand?.products.find((item) => item.id === product.id);
    const useSeededEditorial =
      current.slug === "rolex" &&
      product.id === "2" &&
      !(product.gallery?.length) &&
      !product.contentTitle &&
      !product.contentCopy &&
      !product.price;
    const slug = product.slug || seed?.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const insightBlocks = useSeededEditorial && seed?.insightBlocks?.length
      ? seed.insightBlocks
      : product.insightBlocks?.length
      ? product.insightBlocks
      : seed?.insightBlocks?.length
        ? seed.insightBlocks
        : [
            { id: `model-${product.id}`, label: "Model", value: product.name },
            { id: `details-${product.id}`, label: "Details", value: product.detail },
          ];
    return {
      ...seed,
      ...product,
      slug,
      image: useSeededEditorial ? seed?.image ?? product.image : product.image ?? seed?.image ?? "",
      material: useSeededEditorial ? seed?.material ?? "" : product.material ?? seed?.material ?? "",
      gallery: useSeededEditorial ? seed?.gallery ?? [] : product.gallery ?? seed?.gallery ?? [],
      contentTitle: useSeededEditorial ? seed?.contentTitle ?? "" : product.contentTitle ?? seed?.contentTitle ?? "",
      contentCopy: useSeededEditorial ? seed?.contentCopy ?? "" : product.contentCopy ?? seed?.contentCopy ?? "",
      price: useSeededEditorial ? seed?.price ?? "" : product.price ?? seed?.price ?? "",
      insightBlocks,
      family:
        Number.isInteger(product.family) &&
        product.family >= 0 &&
        product.family < families.length
          ? product.family
          : 0,
    };
  });

  const products = normalizeProductSlugs(rawProducts);

  return { ...current, families, products, darkLogo: true };
}

function normalizeContent(content: SiteContent): SiteContent {
  return {
    ...defaultSiteContent,
    ...content,
    home: { ...defaultSiteContent.home, ...content.home, featuredLogos: { ...defaultSiteContent.home.featuredLogos, ...(content.home?.featuredLogos ?? {}) } },
    brands: (content.brands ?? defaultSiteContent.brands).map((brand) => normalizeBrand(brand)),
  };
}

export async function readSiteContent(): Promise<SiteContent> {
  let db: D1Database | undefined; try { db = (await runtime()).DB; } catch { return defaultSiteContent; }
  if (!db) return defaultSiteContent; await ensureTable(db);
  const row = await db.prepare("SELECT payload FROM site_content WHERE id = ?").bind("primary").first<{ payload: string }>();
  if (!row?.payload) return defaultSiteContent;
  try { return normalizeContent(JSON.parse(row.payload) as SiteContent); } catch { return defaultSiteContent; }
}
export async function writeSiteContent(content: SiteContent) {
  const db = (await runtime()).DB; if (!db) throw new Error("Persistent database is unavailable."); await ensureTable(db);
  const normalized = normalizeContent(content);
  await db.prepare(`INSERT INTO site_content (id, payload, updated_at) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at`).bind("primary", JSON.stringify(normalized), Date.now()).run();
}