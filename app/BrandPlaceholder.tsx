import Image from "next/image";
import BrandPageHeader from "./BrandPageHeader";
import styles from "./BrandPlaceholder.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => basePath + path;

export default function BrandPlaceholder({ brand }: { brand: string }) {
  return (
    <main id="top" className={styles.page}>
      <BrandPageHeader brand={brand} />
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Swiss Perpetual / Collection</p>
        <h1>{brand}</h1>
        <Image src={asset("/swiss/spil-nav.png")} alt="Swiss Perpetual" width={1767} height={1767} unoptimized />
        <div className={styles.copy}>
          <p>The {brand} collection is being prepared for this new experience.</p>
          <a href={asset("/collection/")}>All brands &#8599;</a>
        </div>
      </section>
      <footer className={styles.footer}><span>Collection page to follow</span><span>Manila / Cebu / Davao</span><a href="#top">Back to top</a></footer>
    </main>
  );
}