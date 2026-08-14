"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import BrandPageHeader from "./BrandPageHeader";
import { defaultBrand } from "./content/defaults";
import { useSiteContent } from "./content/useSiteContent";
import styles from "./rolex/rolex.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => path.startsWith("/api/") || path.startsWith("http") ? path : basePath + path;

export default function BrandCataloguePage({ slug }: { slug: string }) {
  const { content } = useSiteContent();
  const managed = content.brands.find((brand) => brand.slug === slug) ?? defaultBrand(slug);
  if (!managed) return null;
  const familyLabels = managed.families.length ? managed.families : ["Collection"];
  const filters = useMemo(() => [
    { label: "All", value: "all" },
    ...familyLabels.map((label, index) => ({ label, value: `family-${index}` })),
  ], [managed.families]);
  const products = useMemo(() => managed.products.filter((product) => product.visible).map((product, index) => ({
    ...product,
    displayId: index + 1,
    category: `family-${product.family >= 0 && product.family < familyLabels.length ? product.family : 0}`,
  })), [managed.products, managed.families]);
  const [filter, setFilter] = useState("all");
  const activeIndex = Math.max(0, filters.findIndex((item) => item.value === filter));
  const activeFilter = filters[activeIndex].value;
  const visibleProducts = products.filter((product) => activeFilter === "all" || product.category === activeFilter);
  const folderOrder = [...filters.slice(activeIndex + 1), ...filters.slice(0, activeIndex), filters[activeIndex]];
  const deckHeight = Math.max(760, 610 + (filters.length - 1) * 52);

  return <main id="top" className={styles.page}>
    <BrandPageHeader brand={managed.name} />
    <header className={styles.masthead}><div className={`${styles.crown} ${styles.catalogueCrown} ${managed.darkLogo ? styles.catalogueCrownDark : ""}`}><Image src={asset(managed.logo)} alt={`${managed.name} logo`} width={managed.logoWidth || 600} height={managed.logoHeight || 300} priority unoptimized /></div></header>
    <section className={styles.collection} aria-label={`${managed.name} collection folders`}>
      <div className={styles.folderDeck} style={{ height: deckHeight }} role="tablist" aria-label={`${managed.name} categories`}>
        {filters.map((item, filterIndex) => {
          const isActive = item.value === activeFilter;
          const count = item.value === "all" ? products.length : products.filter((product) => product.category === item.value).length;
          const tone = item.value === "all" ? styles.folderAll : filterIndex % 2 ? styles.folderSports : styles.folderClassic;
          const slotIndex = folderOrder.findIndex((folder) => folder.value === item.value);
          const layerStyle = { top: slotIndex * 52, zIndex: slotIndex + 1, opacity: Math.min(1, .55 + slotIndex * .14) };
          return <section className={[styles.folderLayer, tone, isActive ? styles.openFolder : ""].join(" ")} style={layerStyle} key={item.value}>
            <button type="button" className={styles.folderHandle} role="tab" aria-selected={isActive} onClick={() => setFilter(item.value)}><span>{item.label}</span><small>{count} pieces</small></button>
            {isActive && <div className={styles.folderContent} role="tabpanel">
              <div className={styles.folderMeta}><p>{item.label} / Collection</p><span>Scroll to explore</span></div>
              <div className={styles.rail}>
                {visibleProducts.length === 0 && <p className={styles.emptyCollection}>No current pieces listed.</p>}
                {visibleProducts.map((product) => {
                  const href = asset(`/${managed.slug}/${product.slug}/`);
                  return <a className={styles.card} href={href} key={product.id} aria-label={`View ${product.name}`}> 
                    <div className={styles.imageWrap}><Image src={asset(product.image)} alt={`${managed.name} ${product.name}`} fill unoptimized sizes="(max-width: 700px) 78vw, 31vw" /><span>{String(product.displayId).padStart(2, "0")}</span></div>
                    <div className={styles.cardCopy}><h2>{product.name}</h2><p>{product.detail}</p></div>
                  </a>;
                })}
              </div>
            </div>}
          </section>;
        })}
      </div>
    </section>
    <footer className={styles.footer}><span>{managed.name} collection</span><span>Manila / Cebu / Davao</span><a href="#top">Back to top</a></footer>
  </main>;
}