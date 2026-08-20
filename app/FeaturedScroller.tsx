"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeContent, ManagedBrand } from "./content/types";
import styles from "./HomepageClean.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => path.startsWith("http") ? path : basePath + path;

export default function FeaturedScroller({ content, brands }: { content: HomeContent; brands: ManagedBrand[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const selected = content.featuredBrands.slice(0, 4)
    .map(slug => brands.find(brand => brand.slug === slug && brand.visible && !brand.archived))
    .filter((brand): brand is ManagedBrand => Boolean(brand));

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true);
        observer.disconnect();
      }
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <section id="collection" ref={sectionRef} className={styles.collection}>
    <div className={styles.collectionInner}>
      <p className={`${styles.eyebrow} ${styles.collectionLabel}`}>02 — {content.featuredHeading}</p>
      <div className={styles.logoGrid}>
        {selected.map((brand, index) => (
          <a
            className={`${styles.brandLogo} ${styles.collectionReveal} ${shown ? styles.collectionShown : ""}`}
            style={{ transitionDelay: `${index * 90}ms` }}
            href={`/${brand.slug}/`}
            key={brand.slug}
          >
            <img
              src={asset(content.featuredLogos?.[brand.slug] || `/swiss/featured-brands/${brand.slug}.png`)}
              alt={brand.name}
            />
          </a>
        ))}
      </div>
      <a className={`${styles.allBrands} ${styles.collectionReveal} ${shown ? styles.collectionShown : ""}`} style={{ transitionDelay: "390ms" }} href="/collection/">All brands ↗</a>
    </div>
  </section>;
}