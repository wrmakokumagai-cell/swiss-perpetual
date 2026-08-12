import styles from "./fonts.module.css";

const fonts = [
  { name: "Oswald", className: styles.oswald, note: "Current - condensed and editorial" },
  { name: "Helvetica Neue", className: styles.helvetica, note: "Swiss, neutral, precise" },
  { name: "Inter", className: styles.inter, note: "Clean and highly readable" },
  { name: "Manrope", className: styles.manrope, note: "Modern with softer geometry" },
  { name: "Archivo", className: styles.archivo, note: "Structured editorial character" },
  { name: "IBM Plex Sans", className: styles.plex, note: "Technical and refined" },
  { name: "Space Grotesk", className: styles.space, note: "Contemporary with personality" },
  { name: "Roboto Condensed", className: styles.roboto, note: "A cleaner condensed alternative" },
  { name: "Aglio Picasso", className: styles.aglio, note: "Your own display font" },
];

export default function FontPreviewPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/">Swiss Perpetual</a>
        <p>Sans-serif type study / select one</p>
        <span>Local preview</span>
      </header>
      <section className={styles.intro}>
        <p>Typography study</p>
        <h1>Choose the voice.</h1>
        <p className={styles.deck}>Every option uses the same wording, size, weight, casing, and spacing. Only the font family changes.</p>
      </section>
      <section className={styles.grid}>
        {fonts.map((font, index) => (
          <article className={`${styles.card} ${font.className}`} key={font.name}>
            <div className={styles.meta}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{font.name}</strong>
              <small>{font.note}</small>
            </div>
            <h2>Luxury watches</h2>
            <p className={styles.navSample}>Collection / Journal / Visit / Inquire</p>
            <p className={styles.copy}>A curated collection of classic and new luxury timepieces, selected for character, craftsmanship, and enduring relevance.</p>
            <p className={styles.cities}>Manila / Cebu / Davao</p>
          </article>
        ))}
      </section>
      <section className={styles.custom}>
        <p>Custom font installed</p>
        <h2>Aglio Picasso is ready.</h2>
        <p>It is self-hosted locally and shown above as option 09. The homepage remains on Space Grotesk until you choose where Aglio Picasso should be used.</p>
      </section>
    </main>
  );
}