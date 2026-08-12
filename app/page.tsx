import Image from "next/image";
import HeroVideo from "./HeroVideo";
import InteractiveLogo from "./InteractiveLogo";
import styles from "./HomeEditorial.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => basePath + path;

const watches = [
  { maker: "Rolex", name: "Submariner Date", meta: "Steel / 40 mm", image: "/swiss/734718066_1781331769975594_7172137934390946895_n.jpg", href: "/rolex" },
  { maker: "Patek Philippe", name: "Aquanaut", meta: "Rose gold / 40.8 mm", image: "/swiss/732001264_1709394479981926_3822128851417537927_n.jpg", href: "https://www.swissperpetual.net/patek-philippe" },
  { maker: "Cartier", name: "Tank Louis", meta: "Yellow gold / Manual wind", image: "/swiss/655010338_1246843210946162_3711279346727771979_n.jpg", href: "https://www.swissperpetual.net/cartier" },
  { maker: "Audemars Piguet", name: "Royal Oak", meta: "Steel / Dual time", image: "/swiss/759145527_2090222878263676_5913549884394655990_n.jpg", href: "https://www.swissperpetual.net/audemars-piguet" },
];

const feedItems = [
  ["/swiss/734718066_1781331769975594_7172137934390946895_n.jpg", "Rolex watch"],
  ["/swiss/655010338_1246843210946162_3711279346727771979_n.jpg", "Cartier watch"],
  ["/swiss/731252602_1953756318614029_5216231060396402331_n.jpg", "Featured wristwatch"],
  ["/swiss/732001264_1709394479981926_3822128851417537927_n.jpg", "Patek Philippe watch"],
  ["/swiss/756612358_2664976090565468_3620901619787513621_n.jpg", "Gold watch editorial"],
  ["/swiss/759145527_2090222878263676_5913549884394655990_n.jpg", "Audemars Piguet watch"],
  ["/swiss/386469065_1150884049223128_5253316123175005677_n.jpg", "Manila showroom"],
  ["/swiss/IMG_0557.JPG", "Davao showroom"],
];

const branches = [
  { city: "Manila", note: "By appointment", image: "/swiss/387789292_18007724104988679_3103763669942720122_n.jpg", href: "https://www.swissperpetual.net/manila" },
  { city: "Cebu", note: "Private showroom", image: "/swiss/sp+cebu.jpg", href: "https://www.swissperpetual.net/cebu" },
  { city: "Davao", note: "Now welcoming", image: "/swiss/IMG_0557.JPG", href: "https://www.swissperpetual.net/davao" },
];

export default function Home() {
  return (
    <main id="top" className={styles.page}>
      <header className={styles.nav}>
        <a className={styles.brand} href="#top" aria-label="Swiss Perpetual"><Image src={asset("/swiss/swiss-perpetual-black-solid.png")} alt="" width={1500} height={250} priority unoptimized /></a>
      </header>

      <section className={styles.intro} aria-labelledby="intro-title">
        <p className={styles.kicker}>The Watch Boy Trio<br />Manila / Cebu / Davao</p>
        <h1 id="intro-title" className={styles.introArtwork}><span className={styles.srOnly}>Seconds That Last</span><Image src={asset("/swiss/STLb.png")} alt="" width={2048} height={347} priority unoptimized /></h1>
        <div className={styles.introCopy}><p>A curated collection of classic and new luxury timepieces, selected for character, craftsmanship, and enduring relevance.</p><a href="#collection">Explore the collection →</a></div>
      </section>

      <section className={styles.hero} aria-label="Swiss Perpetual showroom film">
        <HeroVideo src={asset("/swiss/Toppy.mp4")} poster={asset("/swiss/386469065_1150884049223128_5253316123175005677_n.jpg")} />
        <div className={styles.heroShade} />
        <p>Fine objects<br />considered slowly.</p>
      </section>

      <section className={styles.feature} aria-labelledby="feature-title">
        <div className={styles.featureLeft}>

          <div className={styles.featureEditorial}>
            <InteractiveLogo src={asset("/swiss/spil-point-logo.png")} className={styles.featureWatch} markClassName={styles.featureLogoMark} />
            <div className={styles.featureCopy}><h2 id="feature-title">Watches with<br />a life beyond<br />the moment.</h2><p>From established icons to contemporary references, every piece is chosen to be worn, enjoyed, and passed on. We value provenance, condition, and the quiet details that reward a closer look.</p><a href="#collection">Explore our collection →</a></div>
          </div>
          <div className={styles.featureVisit} id="visit">
            <div className={styles.featureVisitGrid}>
              {branches.map((branch) => (
                <a className={styles.featureVisitCard} href={branch.href} key={branch.city}>
                  <div className={styles.featureVisitImage}><Image src={asset(branch.image)} alt={"Swiss Perpetual " + branch.city} fill unoptimized sizes="(max-width: 560px) 31vw, 11vw" /></div>
                  <span>{branch.city}</span>

                </a>
              ))}
            </div>
            <div className={styles.featureVisitCopy}>
              <p>Appointments are encouraged; conversation is never rushed. Discover the collection in Manila, Cebu, or Davao.</p>
              <a href="https://www.swissperpetual.net/book-now">Book a private viewing →</a>
            </div>
          </div>
        </div>
        <div className={styles.featureImage}><Image src={asset("/swiss/watch-editorial-three-watches-cropped.png")} alt="Collector wearing three luxury watches" fill priority unoptimized sizes="(max-width: 800px) 100vw, 56vw" /></div>
      </section>

      <section className={styles.collection} id="collection" aria-labelledby="collection-title">
        <header className={styles.sectionHeader}><h2 id="collection-title">Available now</h2><a href="https://www.swissperpetual.net/collection">View all ↗</a></header>
        <div className={styles.watchGrid}>{watches.map((watch, index) => <a className={styles.watchCard} href={watch.href} key={watch.name}><div className={styles.watchImage}><Image src={asset(watch.image)} alt={watch.maker + " " + watch.name} fill unoptimized sizes="(max-width: 700px) 100vw, 25vw" /><span>0{index + 1}</span></div><div className={styles.watchMeta}><p>{watch.maker}</p><h3>{watch.name}</h3><small>{watch.meta}</small><b>View piece ↗</b></div></a>)}</div>
      </section>

      <section className={styles.journal} id="journal" aria-labelledby="journal-title">
        <header className={styles.sectionHeader}><h2 id="journal-title">Recent stories</h2><a href="https://www.instagram.com/swissperpetual/">Instagram ↗</a></header>
        <div className={styles.feedGrid}>{feedItems.map((item, index) => <a className={styles.feedCard} href="https://www.instagram.com/swissperpetual/" key={item[0]} aria-label={"View Instagram post " + (index + 1)}><div className={styles.feedImage}><Image src={asset(item[0])} alt={item[1]} fill unoptimized sizes="(max-width: 700px) 50vw, 25vw" /></div><span>Story {String(index + 1).padStart(2, "0")} ↗</span></a>)}</div>
      </section>



      <footer className={styles.footer}><div><p>Swiss Perpetual®</p><h2>Seconds that last.</h2></div><div className={styles.footerLinks}><a href="/rolex">Rolex collection ↗</a><a href="https://www.instagram.com/swissperpetual/">Instagram ↗</a><a href="https://www.swissperpetual.net/trade">Sell or trade ↗</a><a href="#top">Back to top ↑</a></div><p className={styles.copyright}>© 2026 Swiss Perpetual / Manila, Cebu, Davao</p></footer>
    </main>
  );
}