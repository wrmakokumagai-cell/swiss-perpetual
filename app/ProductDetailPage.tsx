"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import BrandPageHeader from "./BrandPageHeader";
import { defaultBrand } from "./content/defaults";
import { useSiteContent } from "./content/useSiteContent";
import styles from "./product-detail.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => path.startsWith("/api/") || path.startsWith("http") ? path : basePath + path;

export default function ProductDetailPage({ brandSlug, productId, productSlug }: { brandSlug: string; productId?: string; productSlug?: string }) {
  const { content } = useSiteContent();
  const [activeImage, setActiveImage] = useState(0);
  const brand = content.brands.find((item) => item.slug === brandSlug) ?? defaultBrand(brandSlug);
  const product = brand?.products.find((item) => productSlug ? item.slug === productSlug : item.id === productId);
  const gallery = useMemo(() => product
    ? Array.from(new Set([product.image, ...(product.gallery ?? [])].filter(Boolean)))
    : [], [product]);
  useEffect(() => setActiveImage((current) => Math.min(current, Math.max(0, gallery.length - 1))), [gallery.length]);
  if (!brand || !product || gallery.length === 0) return null;

  const insightBlocks = (product.insightBlocks ?? []).filter((block) => block.label.trim() || block.value.trim());
  const contentTitle = product.contentTitle || "Quiet proportions. A lasting presence.";
  const contentCopy = product.contentCopy || "An understated 34 mm Oyster Perpetual selected for its balanced proportions and quietly distinctive olive-green dial.\n\nEvery piece is examined for condition, character, and provenance before it enters the Swiss Perpetual collection.";
  const paragraphs = contentCopy.split(/\n\s*\n/).filter(Boolean);
  const previousImage = () => setActiveImage((current) => (current - 1 + gallery.length) % gallery.length);
  const nextImage = () => setActiveImage((current) => (current + 1) % gallery.length);
  const titleLength = product.name.trim().length;
  const titleSizeClass = titleLength > 42
    ? styles.titleExtraLong
    : titleLength > 28
      ? styles.titleLong
      : titleLength > 20
        ? styles.titleMedium
        : "";

  return <main id="top" className={styles.page}>
    <BrandPageHeader brand={brand.name} backHref={asset(`/${brandSlug}/`)} />
    <section className={styles.intro}>
      <p>{brand.name} / Selected piece</p>
      <h1 className={titleSizeClass}>{product.name}</h1>
    </section>
    <section className={styles.editorial}>
      <aside className={styles.index}>
        <span>01</span>
        <p>Curator<br />Insight</p>
        <dl>{insightBlocks.map((block) => <div key={block.id}><dt>{block.label}</dt><dd>{block.value}</dd></div>)}</dl>
      </aside>
      <figure className={styles.productImage}>
        <Image key={gallery[activeImage]} src={asset(gallery[activeImage])} alt={`${brand.name} ${product.name}, view ${activeImage + 1}`} fill priority unoptimized sizes="(max-width: 760px) 92vw, 48vw" />
        <figcaption>Swiss Perpetual</figcaption>
        <div className={styles.galleryControls} aria-label="Product image controls">
          <span>{String(activeImage + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span>
          <button type="button" onClick={previousImage} aria-label="Previous image">&#8592;</button>
          <button type="button" onClick={nextImage} aria-label="Next image">&#8594;</button>
        </div>
      </figure>
      <article className={styles.notes}>
        <p className={styles.kicker}>Curator Insight</p>
        <h2>{contentTitle}</h2>
        {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        {product.price && <p className={styles.price}>{product.price}</p>}
        <a href="https://www.instagram.com/swissperpetual/">Inquire about this piece ↗</a>
      </article>
    </section>
    <footer className={styles.footer}><span>{brand.name} / {product.name}</span></footer>
  </main>;
}