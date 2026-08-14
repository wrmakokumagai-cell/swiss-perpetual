"use client";

import { useEffect, useRef } from "react";
import type { HomeContent, ManagedBrand } from "./content/types";
import styles from "./HomeEditorial.module.css";

export default function FeaturedScroller({ content, brands }: { content: HomeContent; brands: ManagedBrand[] }) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const bounds = scene.getBoundingClientRect();
      const distance = Math.max(scene.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -bounds.top / distance));
      const intro = 1 - Math.min(1, Math.max(0, (progress - 0.25) / 0.2));
      const reveal = Math.min(1, Math.max(0, (progress - 0.52) / 0.18));
      const family = Math.min(1, Math.max(0, (progress - 0.68) / 0.2));
      const allBrands = Math.min(1, Math.max(0, (progress - 0.87) / 0.08));
      const easedFamily = 0.5 - Math.cos(family * Math.PI) / 2;
      const familyRemaining = 1 - easedFamily;
      const isCompact = window.innerWidth <= 760;

      scene.style.setProperty("--featured-blur", `${(progress * 20).toFixed(2)}px`);
      scene.style.setProperty("--featured-brightness", (1 - progress * 0.48).toFixed(3));
      scene.style.setProperty("--featured-saturation", (1 - progress * 0.25).toFixed(3));
      scene.style.setProperty("--featured-scale", (1.015 + progress * 0.035).toFixed(4));
      scene.style.setProperty("--featured-wash", (0.56 + progress * 0.33).toFixed(3));
      scene.style.setProperty("--featured-intro-opacity", intro.toFixed(3));
      scene.style.setProperty("--featured-opening-shift", `${(-progress * 115).toFixed(2)}px`);
      scene.style.setProperty("--featured-reveal-opacity", reveal.toFixed(3));
      scene.style.setProperty("--featured-reveal-inset", `${((1 - reveal) * 100).toFixed(2)}%`);
      scene.style.setProperty(
        "--featured-reveal-shift",
        `${((1 - reveal) * 78 - easedFamily * window.innerHeight * 0.3).toFixed(2)}px`,
      );
      scene.style.setProperty("--featured-family-opacity", family.toFixed(3));
      scene.style.setProperty("--featured-ap-x", `${familyRemaining * (isCompact ? -70 : -150)}px`);
      scene.style.setProperty("--featured-ap-y", `${familyRemaining * (isCompact ? 110 : 160)}px`);
      scene.style.setProperty("--featured-rolex-x", `${familyRemaining * (isCompact ? 70 : -48)}px`);
      scene.style.setProperty("--featured-rolex-y", `${familyRemaining * (isCompact ? 110 : 160)}px`);
      scene.style.setProperty("--featured-cartier-x", `${familyRemaining * (isCompact ? -70 : 48)}px`);
      scene.style.setProperty("--featured-cartier-y", `${familyRemaining * (isCompact ? 110 : 160)}px`);
      scene.style.setProperty("--featured-patek-x", `${familyRemaining * (isCompact ? 70 : 150)}px`);
      scene.style.setProperty("--featured-patek-y", `${familyRemaining * (isCompact ? 110 : 160)}px`);
      scene.style.setProperty("--featured-center-scale", "1");
      scene.style.setProperty("--featured-all-brands-opacity", allBrands.toFixed(3));
      scene.dataset.familyReady = family > 0.84 ? "true" : "false";
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div ref={sceneRef} className={styles.featuredScrollScene}>
      <div className={styles.featuredSticky}>
        <div className={styles.featuredSceneImage} aria-hidden="true" />
        <div className={styles.featuredSceneWash} aria-hidden="true" />

        <div className={styles.featuredOpening}>
          <p className={styles.featuredEyebrow}>Our Collection</p>
          <h2>{content.featuredIntroHeading}</h2>
          <p>{content.featuredIntroCopy}</p>

        </div>

        <div className={styles.featuredReveal} aria-live="polite">
          <h2 id="collection-title">{content.featuredHeading}</h2>
        </div>

        <div className={styles.featuredFamily} aria-label="Featured watch brands">
          {content.featuredBrands.slice(0, 4).map((slug, index) => {
            const brand = brands.find((item) => item.slug === slug && item.visible && !item.archived);
            if (!brand) return null;
            const slots = [styles.featuredBrandAp, styles.featuredBrandRolex, styles.featuredBrandCartier, styles.featuredBrandPatek];
            return <a className={`${styles.featuredBrandLogo} ${slots[index]}`} href={`/${brand.slug}/`} key={brand.slug}>
              <img src={content.featuredLogos?.[brand.slug] || `/swiss/featured-brands/${brand.slug}.png`} alt={brand.name} />
            </a>;
          })}
        </div>
        <a className={styles.featuredAllBrands} href="/collection/">
          All brands &#8599;
        </a>
      </div>
    </div>
  );
}

