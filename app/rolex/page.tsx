"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./rolex.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => basePath + path;
type Filter = "all" | "sports" | "classic";

const products = [
  { id: 1, name: "Oyster Perpetual 34", detail: "Olive Green Dial / 2016", category: "classic" },
  { id: 2, name: "Datejust 41", detail: "Wimbledon / Rose Gold / 2020", category: "classic" },
  { id: 3, name: "Datejust 36", detail: "Mint Green Dial / 2024", category: "classic" },
  { id: 4, name: "Milgauss 40", detail: "Black Dial / 2020", category: "sports" },
  { id: 5, name: "Datejust 41", detail: "Wimbledon / 2025", category: "classic" },
  { id: 6, name: "Datejust 41", detail: "Chocolate Dial / 2021", category: "classic" },
  { id: 7, name: "Datejust 41", detail: "Black Wimbledon / 2011", category: "classic" },
  { id: 8, name: "Datejust 36", detail: "Classic Steel / 2011", category: "classic" },
  { id: 9, name: "Datejust 36", detail: "Mother of Pearl / 2020", category: "classic" },
  { id: 10, name: "Daytona", detail: "John Mayer / 2018", category: "sports" },
  { id: 11, name: "Day-Date 40", detail: "Chocolate Dial / 2019", category: "classic" },
  { id: 12, name: "Datejust 36", detail: "Classic Steel / 2010", category: "classic" },
  { id: 13, name: "Sky-Dweller 42", detail: "Oystersteel / 2022", category: "classic" },
  { id: 14, name: "Daytona Cosmograph", detail: "Chocolate Arabic Dial / 2017", category: "sports" },
  { id: 15, name: "Submariner Date 40", detail: "Oystersteel / 1991", category: "sports" },
  { id: 16, name: "Air-King 40", detail: "Black Dial / 2025", category: "sports" },
  { id: 17, name: "Yacht-Master 40", detail: "Oystersteel / 2017", category: "sports" },
  { id: 18, name: "Datejust 36", detail: "Turn-O-Graph / 2004", category: "classic" },
  { id: 19, name: "Datejust 41", detail: "Black Diamond Dial / 2019", category: "classic" },
  { id: 20, name: "Datejust 41", detail: "Two-Tone Rose Gold / 2018", category: "classic" },
  { id: 21, name: "Datejust 36", detail: "Yellow Gold / 1991", category: "classic" },
  { id: 22, name: "Datejust 36", detail: "Yellow Gold / 2017", category: "classic" },
  { id: 23, name: "Datejust 36", detail: "Silver Anniversary / 2008", category: "classic" },
  { id: 24, name: "Datejust 31", detail: "Chocolate Roman Dial / 2022", category: "classic" },
  { id: 25, name: "Datejust 36", detail: "Silver Roman Dial / 2011", category: "classic" },
  { id: 26, name: "Datejust 31", detail: "Floral Dial / 2018", category: "classic" },
  { id: 27, name: "Datejust 31", detail: "Pink Diamond Dial / 2019", category: "classic" },
  { id: 28, name: "Day-Date 36", detail: "Rose Gold / Pink Diamonds / 2011", category: "classic" },
  { id: 29, name: "Datejust 36", detail: "Black Anniversary / 2017", category: "classic" },
  { id: 30, name: "Rolex 1908", detail: "Perpetual Collection / 2025", category: "classic" },
  { id: 31, name: "Yacht-Master 40", detail: "Oystersteel / 2005", category: "sports" },
  { id: 32, name: "Yacht-Master 40", detail: "Oystersteel / 2006", category: "sports" },
] as const;

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Sports", value: "sports" },
  { label: "Classic", value: "classic" },
];

export default function RolexPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const visibleProducts = useMemo(
    () => products.filter((product) => filter === "all" || product.category === filter),
    [filter],
  );


  const activeIndex = filters.findIndex((item) => item.value === filter);

  const folderOrder = [
    filters[(activeIndex + 2) % filters.length],
    filters[(activeIndex + 1) % filters.length],
    filters[activeIndex],
  ];

  return (
    <main id="top" className={styles.page}>
      <nav className={styles.nav} aria-label="Rolex collection navigation">
        <a className={styles.navBrand} href={asset("/")} aria-label="Swiss Perpetual home">
          <Image src={asset("/swiss/spil-nav.png")} alt="Swiss Perpetual" width={1767} height={1767} priority unoptimized />
        </a>
        <span className={styles.navTagline}><Image src={asset("/swiss/stl-nav.png")} alt="Seconds that last" width={2048} height={540} priority unoptimized /></span>
        <span className={styles.navTitle}>Rolex Collection</span>
      </nav>
      <header className={styles.masthead}>
        <div className={styles.eyebrow}><span>Rolex</span><span>New arrivals</span></div>
        <div className={styles.crown}><Image src={asset("/swiss/rolex/rolex-logo-white-transparent.png")} alt="Rolex" width={1600} height={976} priority unoptimized /></div>
      </header>
      <section className={styles.collection} aria-label="Rolex collection folders">
        <div className={styles.folderDeck} role="tablist" aria-label="Rolex categories">
          {filters.map((item) => {
            const isActive = item.value === filter;
            const count = item.value === "all" ? products.length : products.filter((product) => product.category === item.value).length;
            const tone = item.value === "classic" ? styles.folderClassic : item.value === "sports" ? styles.folderSports : styles.folderAll;
            const slot = [styles.folderBack, styles.folderMiddle, styles.folderFront][folderOrder.findIndex((folder) => folder.value === item.value)];
            return (
              <section className={[styles.folderLayer, tone, slot, isActive ? styles.openFolder : ""].join(" ")} key={item.value}>
                <button
                  type="button"
                  className={styles.folderHandle}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={isActive ? "rolex-folder-content" : undefined}
                  onClick={() => setFilter(item.value)}
                >
                  <span>{item.label}</span>
                  <small>{count} pieces</small>
                </button>
                {isActive && (
                  <div className={styles.folderContent} id="rolex-folder-content" role="tabpanel">
                    <div className={styles.folderMeta}>
                      <p>{item.label} / Collection</p>
                      <span>Scroll to explore</span>
                    </div>
                    <div className={styles.rail}>
                      {visibleProducts.map((product) => (
                        <a className={styles.card} href="https://www.instagram.com/swissperpetual/" key={product.id} aria-label={"Inquire about " + product.name + ", " + product.detail}>
                          <div className={styles.imageWrap}>
                            <Image src={asset("/swiss/rolex/rolex-" + String(product.id).padStart(2, "0") + ".jpg")} alt={product.name + ", " + product.detail} fill unoptimized sizes="(max-width: 700px) 78vw, 31vw" />
                            <span>{String(product.id).padStart(2, "0")}</span>
                          </div>
                          <div className={styles.cardCopy}><h2>{product.name}</h2><p>{product.detail}</p></div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </section>
      <footer className={styles.footer}><span>Rolex collection</span><span>Manila / Cebu / Davao</span><a href="#top">Back to top</a></footer>
    </main>
  );
}