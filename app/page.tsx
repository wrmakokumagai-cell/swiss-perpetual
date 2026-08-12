import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const watches = [
  { name: "Submariner Date", maker: "Rolex", detail: "Steel Â· 40 mm Â· Complete set", image: "/swiss/734718066_1781331769975594_7172137934390946895_n.jpg", href: "https://www.swissperpetual.net/rolex" },
  { name: "Aquanaut", maker: "Patek Philippe", detail: "Rose gold Â· 40.8 mm", image: "/swiss/732001264_1709394479981926_3822128851417537927_n.jpg", href: "https://www.swissperpetual.net/patek-philippe" },
  { name: "Tank Louis", maker: "Cartier", detail: "Yellow gold Â· Manual wind", image: "/swiss/655010338_1246843210946162_3711279346727771979_n.jpg", href: "https://www.swissperpetual.net/cartier" },
  { name: "Royal Oak", maker: "Audemars Piguet", detail: "Steel Â· 39 mm Â· Dual time", image: "/swiss/759145527_2090222878263676_5913549884394655990_n.jpg", href: "https://www.swissperpetual.net/audemars-piguet" },
];

const notes = [
  { number: "01", title: "The quiet confidence of a black dial", tag: "On the wrist", image: "/swiss/731252602_1953756318614029_5216231060396402331_n.jpg" },
  { number: "02", title: "Gold, green, and the Daytona after dark", tag: "Field notes", image: "/swiss/756612358_2664976090565468_3620901619787513621_n.jpg" },
  { number: "03", title: "Cebu: a room made for taking your time", tag: "At the maison", image: "/swiss/sp+cebu.jpg" },
];

export default function Home() {
  return (
    <main id="top">
      <header className="header">
        <a className="wordmark" href="#top" aria-label="Swiss Perpetual home"><span>Swiss</span><span>Perpetual</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation"><a href="#collection">Collection</a><a href="#journal">Journal</a><a href="#visit">Visit</a></nav>
        <a className="header-cta" href="https://www.swissperpetual.net/contact-us">Inquire <span aria-hidden="true">â†—</span></a>
        <details className="mobile-menu"><summary aria-label="Open navigation">Menu</summary><nav aria-label="Mobile navigation"><a href="#collection">Collection</a><a href="#journal">Journal</a><a href="#visit">Visit</a><a href="https://www.swissperpetual.net/contact-us">Inquire</a></nav></details>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="micro">Est. Manila Â· 2017</p>
          <h1 id="hero-title">Seconds<br />that last.</h1>
          <p className="hero-deck">Exceptional watches, thoughtfully sourced.<br />For now, and for what comes after.</p>
          <a className="text-link" href="#collection">View the collection <span>â†˜</span></a>
        </div>
        <div className="hero-image-frame">
          <video className="hero-image" autoPlay muted loop playsInline poster={asset("/swiss/734718066_1781331769975594_7172137934390946895_n.jpg")} aria-label="Swiss Perpetual collection film"><source src={asset("/swiss/Toppy.mp4")} type="video/mp4" /></video>
          <span className="hero-index">No. 01 / 04</span><span className="hero-caption">The daily perpetual<br />Rolex Submariner</span>
        </div>
        <p className="hero-vertical" aria-hidden="true">Curated in the Philippines Â· Authenticated worldwide</p>
      </section>

      <section className="manifesto" aria-labelledby="manifesto-title">
        <p className="section-index">01 â€” Our point of view</p>
        <h2 id="manifesto-title">We collect objects that<br />outlive the moment.</h2>
        <div className="manifesto-copy"><p>Not simply watches. Milestones, future heirlooms, and stories still being written.</p><p>Every piece is selected with discretion, examined with care, and presented without noise.</p></div>
      </section>

      <section className="collection" id="collection" aria-labelledby="collection-title">
        <div className="section-topline"><p className="section-index">02 â€” The current edit</p><h2 id="collection-title">Available now</h2><a href="https://www.swissperpetual.net/collection">View all <span>â†—</span></a></div>
        <div className="watch-grid">
          {watches.map((watch, index) => (
            <a className="watch-card" href={watch.href} key={watch.name}>
              <div className="watch-image-wrap"><Image src={asset(watch.image)} alt={`${watch.maker} ${watch.name}`} fill unoptimized sizes="(max-width: 680px) 100vw, 25vw" /><span className="watch-number">0{index + 1}</span><span className="watch-view">View piece â†—</span></div>
              <div className="watch-meta"><p>{watch.maker}</p><h3>{watch.name}</h3><span>{watch.detail}</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="statement" aria-label="Swiss Perpetual statement"><p>Time is personal.</p><div className="statement-track" aria-hidden="true"><span>SWISS PERPETUAL</span><span>SWISS PERPETUAL</span></div><p>Choose accordingly.</p></section>

      <section className="journal" id="journal" aria-labelledby="journal-title">
        <div className="section-topline journal-heading"><p className="section-index">03 â€” The perpetual journal</p><h2 id="journal-title">From the feed,<br />with more context.</h2><a href="https://www.instagram.com/swissperpetual/">Instagram <span>â†—</span></a></div>
        <div className="journal-grid">
          {notes.map((note) => (
            <article className="journal-card" key={note.number}><a href="https://www.instagram.com/swissperpetual/" aria-label={`Read ${note.title} on Instagram`}><div className="journal-image-wrap"><Image src={asset(note.image)} alt="" fill unoptimized sizes="(max-width: 760px) 100vw, 33vw" /><span className="journal-open">â†—</span></div><div className="journal-meta"><span>{note.number}</span><p>{note.tag}</p><h3>{note.title}</h3></div></a></article>
          ))}
        </div>
        <p className="sync-note">Designed for automatic publishing from Instagram Â· Content keeps the Swiss Perpetual layout and typography.</p>
      </section>

      <section className="visit" id="visit" aria-labelledby="visit-title">
        <div className="visit-image-wrap"><Image src={asset("/swiss/386469065_1150884049223128_5253316123175005677_n.jpg")} alt="Swiss Perpetual showroom" fill unoptimized sizes="(max-width: 760px) 100vw, 54vw" /></div>
        <div className="visit-copy"><p className="section-index">04 â€” Private viewing</p><h2 id="visit-title">Take<br />your time.</h2><p>Visit us in Manila, Cebu, or Davao. Appointments are encouraged; conversation is not rushed.</p><div className="locations"><a href="https://www.swissperpetual.net/manila">Manila <span>â†—</span></a><a href="https://www.swissperpetual.net/cebu">Cebu <span>â†—</span></a><a href="https://www.swissperpetual.net/davao">Davao <span>â†—</span></a></div><a className="solid-button" href="https://www.swissperpetual.net/book-now">Book a private viewing</a></div>
      </section>

      <footer>
        <div className="footer-title"><span>Swiss</span><span>Perpetual</span></div>
        <div className="footer-grid"><p>Fine watches<br />Manila Â· Cebu Â· Davao</p><div><a href="https://www.instagram.com/swissperpetual/">Instagram â†—</a><a href="https://www.facebook.com/swissperpetual">Facebook â†—</a></div><div><a href="https://www.swissperpetual.net/trade">Sell or trade</a><a href="https://www.swissperpetual.net/watch-servicing">Watch servicing</a></div><a className="back-top" href="#top">Back to top â†‘</a></div>
        <div className="footer-legal"><span>Â© 2026 Swiss Perpetual</span><span>Seconds that last.</span></div>
      </footer>
    </main>
  );
}
