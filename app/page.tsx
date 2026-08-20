"use client";

import Image from "next/image";
import { useEffect } from "react";
import HeroVideo from "./HeroVideo";
import FeaturedScroller from "./FeaturedScroller";
import VisitUsSection from "./VisitUsSection";
import { useSiteContent } from "./content/useSiteContent";
import styles from "./HomepageClean.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => path.startsWith("/api/") || path.startsWith("http") ? path : basePath + path;

export default function Home() {
  const { content } = useSiteContent();
  const home = content.home;

  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      reveals.forEach((node) => { node.dataset.revealVisible = "true"; });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const node = entry.target as HTMLElement;
        node.dataset.revealVisible = "true";
        observer.unobserve(node);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -12% 0px" });

    reveals.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  const conveyor = (home.conveyorBrands?.length
    ? home.conveyorBrands
    : content.brands.filter((brand) => brand.slug !== "others").map((brand) => brand.slug))
    .flatMap((slug) => {
      const brand = content.brands.find((item) => item.slug === slug);
      return brand ? [brand] : [];
    });

  const watchStrip = home.watchHeading.join(" ").replace(/\s+/g, " ").trim();

  const horizontalStrip = (text: string) => <section className={styles.strip} aria-label={text}>
    <div className={styles.stripTrack} aria-hidden="true">
      {[0, 1].map((group) => <div className={styles.stripGroup} key={group}>
        {[0, 1, 2].map((item) => <span className={styles.display} key={`${group}-${item}`}>{text}<i>/</i></span>)}
      </div>)}
    </div>
  </section>;
  return <main id="top" className={styles.page}>
    <header className={styles.nav}>

      <a className={styles.navLogo} href="#top" aria-label="Swiss Perpetual home"><Image src={asset(home.navigationLogo)} alt="Swiss Perpetual" fill priority unoptimized /></a>

    </header>

    <section className={styles.intro}>
      <div className={styles.introTop}>
        <p className={styles.eyebrow + " " + styles.introKicker}>{home.introKicker.split("\n").map((line, i) => <span key={line + i}>{i > 0 && <br />}{line}</span>)}</p>
        <div className={styles.introCopy}><p>{home.introCopy}</p><a className={styles.textLink} href="/collection/">Explore the collection ↗</a></div>
      </div>
      <Image className={styles.wordmark} src={asset(home.introLogo)} alt="Seconds That Last" width={5884} height={980} priority unoptimized />
      <div className={styles.heroGrid}>
        <p className={styles.eyebrow + " " + styles.heroLabel}>Manila flagship store</p>
        <div className={styles.hero}><HeroVideo src={asset(home.heroVideo)} poster={asset(home.heroPoster)} /><div className={styles.heroShade} /><p className={styles.eyebrow + " " + styles.heroCopy}>{home.heroCopy}</p></div>
      </div>
    </section>

    <div className={styles.marquee} aria-label="Swiss Perpetual brands"><div className={styles.marqueeTrack}>{[0,1].map(group => <div className={styles.marqueeGroup} key={group}>{conveyor.map((brand) => <span key={`${group}-${brand.slug}`}>{brand.name}<i>/</i></span>)}</div>)}</div></div>

    <section className={styles.statement}>
      <div className={`${styles.statementGrid} ${styles.scrollReveal}`} data-scroll-reveal><p className={styles.eyebrow}>Our collection</p><h2 className={styles.display}>Made for now.<br />Kept for generations.</h2></div>
      <div className={styles.statementDetail}><h3 className={`${styles.display} ${styles.scrollReveal} ${styles.revealDelayOne}`} data-scroll-reveal>{home.featuredIntroHeading}</h3><p className={`${styles.scrollReveal} ${styles.revealDelayTwo}`} data-scroll-reveal>{home.featuredIntroCopy}</p></div>
    </section>

    {horizontalStrip(watchStrip)}
    <section id="collection"><FeaturedScroller content={home} brands={content.brands} /></section>
    <section id="visit"><VisitUsSection locations={home.visitLocations} /></section>

    <footer className={styles.footer}>
      <Image className={styles.footerBrand} src={asset("/swiss/footer-logo-white.png")} alt="Swiss Perpetual Luxury Watches" width={1039} height={500} unoptimized />
      <p className={styles.copyright}>© 2026 Swiss Perpetual / Manila, Cebu, Davao</p>
      <a href="https://wrmakokumagai-cell.github.io/" target="_blank" rel="noreferrer"><Image className={styles.footerPortfolio} src={asset("/swiss/OP.png")} alt="WR Mako Kumagai" width={11180} height={5262} unoptimized /></a>
    </footer>
  </main>;
}

