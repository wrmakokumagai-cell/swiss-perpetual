"use client";

import Image from "next/image";
import HeroVideo from "./HeroVideo";
import FeaturedScroller from "./FeaturedScroller";
import ScrollWipeHeading from "./ScrollWipeHeading";
import { useSiteContent } from "./content/useSiteContent";
import styles from "./HomeEditorial.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => path.startsWith("/api/") || path.startsWith("http") ? path : basePath + path;

export default function Home() {
  const { content } = useSiteContent();
  const home = content.home;
  return <main id="top" className={styles.page}>
    <header className={styles.nav}><a className={styles.brand} href="#top" aria-label="Swiss Perpetual"><Image src={asset(home.navigationLogo)} alt="" width={1500} height={250} priority unoptimized /></a></header>
    <section className={styles.intro} aria-labelledby="intro-title">
      <p className={styles.kicker}>{home.introKicker.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</p>
      <h1 id="intro-title" className={styles.introArtwork}><span className={styles.srOnly}>Seconds That Last</span><Image src={asset(home.introLogo)} alt="" width={5884} height={980} priority unoptimized /></h1>
      <div className={styles.introCopy}><p>{home.introCopy}</p><a href="/collection/">Explore the collection</a></div>
    </section>
    <section className={styles.hero} aria-label="Swiss Perpetual showroom film">
      <HeroVideo src={asset(home.heroVideo)} poster={asset(home.heroPoster)} />
      <div className={styles.heroShade} />
      <p>{home.heroCopy.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</p>
    </section>
    <section className={styles.featureStage} id="visit" aria-labelledby="feature-title" data-wipe-stage>
      <div className={styles.featureSticky}><div className={styles.feature}><div className={styles.featureLeft}><div className={styles.featureEditorial}><div className={styles.featureCopy}><ScrollWipeHeading lines={home.watchHeading} />{home.watchCopy && <p>{home.watchCopy}</p>}</div></div></div><div className={styles.featureImage} aria-hidden="true" /></div></div>
    </section>
    <section className={styles.collection} id="collection" aria-labelledby="collection-title"><FeaturedScroller content={home} brands={content.brands} /></section>
    <section className={styles.journal} id="journal" aria-labelledby="journal-title">
      <header className={styles.sectionHeader}><h2 id="journal-title">{home.storiesHeading}</h2><a href="https://www.instagram.com/swissperpetual/">Instagram</a></header>
      <div className={styles.feedGrid}>{home.stories.map((item, index) => <a className={styles.feedCard} href={item.href} key={`${item.image}-${index}`} aria-label={`View story ${index + 1}`}><div className={styles.feedImage}><Image src={asset(item.image)} alt={item.alt} fill unoptimized sizes="(max-width: 700px) 50vw, 25vw" /></div><span>Story {String(index + 1).padStart(2, "0")}</span></a>)}</div>
    </section>
    <footer className={styles.footer}><div className={styles.footerBrand}><Image src={asset("/swiss/footer-logo-white.png")} alt="Swiss Perpetual Luxury Watches" width={1039} height={500} unoptimized /></div><a className={styles.footerPortfolio} href="https://wrmakokumagai-cell.github.io/" target="_blank" rel="noreferrer" aria-label="Visit WR Mako Kumagai portfolio"><Image src={asset("/swiss/OP.png")} alt="WR Mako Kumagai" width={11180} height={5262} unoptimized /></a><p className={styles.copyright}>© 2026 Swiss Perpetual / Manila, Cebu, Davao</p></footer>
  </main>;
}
