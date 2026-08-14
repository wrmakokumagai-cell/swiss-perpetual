"use client";

import Image from "next/image";
import { useState } from "react";
import BrandPageHeader from "../BrandPageHeader";
import { useSiteContent } from "../content/useSiteContent";
import styles from "./collection.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => basePath + path;

export default function CollectionPage() {
  const { content } = useSiteContent();
  const brands = content.brands.filter((brand) => brand.visible && !brand.archived && brand.products.some((product) => product.visible));
  const [selected, setSelected] = useState(0);
  if (!brands.length) return null;
  const safeSelected = selected % brands.length;
  const at = (offset: number) => brands[(safeSelected + offset + brands.length) % brands.length];
  const move = (direction: number) => setSelected((current) => (current + direction + brands.length) % brands.length);
  const renderMark = (brand: (typeof brands)[number]) => <span className={styles.typeMark}>{brand.name}</span>;
  return <main id="top" className={styles.page}>
    <BrandPageHeader brand="All Collections" collectionRoot />
    <header className={styles.masthead}><Image className={styles.wordmark} src={asset(content.home.introLogo)} alt="Seconds That Last" width={2048} height={350} priority unoptimized /></header>
    <section className={styles.carouselSection} aria-labelledby="all-brands-title">
      <div className={styles.carousel} id="all-brands-title" aria-live="polite">
        <button key={at(-1).slug} className={`${styles.brandPanel} ${styles.brandLeft}`} type="button" onClick={() => move(-1)} aria-label={`Select ${at(-1).name}`}>{renderMark(at(-1))}</button>
        <div key={at(0).slug} className={`${styles.brandPanel} ${styles.brandSelected}`}><a href={`/${at(0).slug}/`}>{renderMark(at(0))}</a><p>{String(safeSelected + 1).padStart(2, "0")} / {brands.length}</p></div>
        <button key={at(1).slug} className={`${styles.brandPanel} ${styles.brandRight}`} type="button" onClick={() => move(1)} aria-label={`Select ${at(1).name}`}>{renderMark(at(1))}</button>
      </div>
      <div className={styles.controls} aria-label="Brand carousel controls"><button type="button" onClick={() => move(-1)} aria-label="Previous brand"><span className={styles.chevronLeft} aria-hidden="true" /></button><button type="button" onClick={() => move(1)} aria-label="Next brand"><span className={styles.chevronRight} aria-hidden="true" /></button></div>
    </section>
    <footer className={styles.footer}><span>Seconds that last</span><span>Manila / Cebu / Davao</span><a href="#top">Back to top</a></footer>
  </main>;
}
