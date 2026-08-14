export const slugifyProductName = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "product";

export function normalizeProductSlugs<T extends { name: string; slug: string }>(products: T[]): T[] {
  const bases = products.map((product) => slugifyProductName(product.name));
  const totals = new Map<string, number>();
  bases.forEach((base) => totals.set(base, (totals.get(base) ?? 0) + 1));
  const occurrences = new Map<string, number>();

  return products.map((product, index) => {
    const base = bases[index];
    const occurrence = (occurrences.get(base) ?? 0) + 1;
    occurrences.set(base, occurrence);
    const slug = (totals.get(base) ?? 0) > 1 ? `${base}-${occurrence}` : base;
    return product.slug === slug ? product : { ...product, slug };
  });
}