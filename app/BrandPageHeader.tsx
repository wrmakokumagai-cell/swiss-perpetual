"use client";

import Image from "next/image";
import styles from "./rolex/rolex.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => basePath + path;

export default function BrandPageHeader({ brand, collectionRoot = false, backHref }: { brand: string; collectionRoot?: boolean; backHref?: string }) {
  const goBack = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!backHref) return;
    event.preventDefault();
    try {
      const referrer = document.referrer ? new URL(document.referrer) : null;
      if (referrer?.origin === window.location.origin && window.history.length > 1) {
        window.history.back();
        return;
      }
    } catch {}
    window.location.href = backHref;
  };
  return (
    <>
      <nav className={styles.nav} aria-label={`${brand} collection navigation`}>
        <a className={styles.navBrand} href={asset("/")} aria-label="Swiss Perpetual home">
          <Image src={asset("/swiss/spil-nav.png")} alt="Swiss Perpetual" width={1767} height={1767} priority unoptimized />
        </a>
        {collectionRoot ? <span className={styles.navTitle}>All Collections</span> : <span className={styles.navTitle}>{brand} Collection</span>}
      </nav>
      {backHref ? (
        <div className={styles.eyebrow}><a href={backHref} onClick={goBack}>Back</a></div>
      ) : collectionRoot ? (
        <div className={styles.eyebrow}><a href={asset("/")}>Home</a></div>
      ) : (
        <div className={styles.eyebrow}><a href={asset("/collection/")}>View collection</a></div>
      )}
    </>
  );
}