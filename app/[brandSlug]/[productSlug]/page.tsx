import ProductDetailPage from "../../ProductDetailPage";
import { defaultSiteContent } from "../../content/defaults";

export function generateStaticParams() {
  return defaultSiteContent.brands.flatMap((brand) =>
    brand.products.map((product) => ({ brandSlug: brand.slug, productSlug: product.slug })),
  );
}

export default async function ManagedProductPage({ params }: { params: Promise<{ brandSlug: string; productSlug: string }> }) {
  const { brandSlug, productSlug } = await params;
  return <ProductDetailPage brandSlug={brandSlug} productSlug={productSlug} />;
}