import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const watches = [
  { maker: "Rolex", name: "Submariner Date", meta: "Steel · 40 mm", image: "/swiss/734718066_1781331769975594_7172137934390946895_n.jpg", href: "https://www.swissperpetual.net/rolex" },
  { maker: "Patek Philippe", name: "Aquanaut", meta: "Rose gold · 40.8 mm", image: "/swiss/732001264_1709394479981926_3822128851417537927_n.jpg", href: "https://www.swissperpetual.net/patek-philippe" },
  { maker: "Cartier", name: "Tank Louis", meta: "Yellow gold · Manual wind", image: "/swiss/655010338_1246843210946162_3711279346727771979_n.jpg", href: "https://www.swissperpetual.net/cartier" },
  { maker: "Audemars Piguet", name: "Royal Oak", meta: "Steel · Dual time", image: "/swiss/759145527_2090222878263676_5913549884394655990_n.jpg", href: "https://www.swissperpetual.net/audemars-piguet" },
];

const stories = [
  { title: "The quiet confidence of a black dial", label: "On the wrist", image: "/swiss/731252602_1953756318614029_5216231060396402331_n.jpg" },
  { title: "Gold, green, and the Daytona after dark", label: "Field notes", image: "/swiss/756612358_2664976090565468_3620901619787513621_n.jpg" },
  { title: "Cebu: a room made for taking your time", label: "At the maison", image: "/swiss/sp+cebu.jpg" },
];

export default function Home() {
  return (
    <main id="top">
      <header className="topbar">
        <a className="mark" href="#top" aria-label="Swiss Perpetual home"><span>SP</span><small>Swiss Perpetual</small></a>
        <nav aria-label="Primary navigation"><a href="#collection">Collection</a><a href="#journal">Journal</a><a href="#visit">Visit</a></nav>
        <a className="inquire" href="https://www.swissperpetual.net/contact-us">Inquire ↗</a>
      </header>

      <section className="cover" aria-labelledby="cover-title">
        <div className="cover-motion">
          <video autoPlay muted loop playsInline poster={asset("/swiss/734718066_1781331769975594_7172137934390946895_n.jpg")} aria-label="Swiss Perpetual collection film"><source src={asset("/swiss/Toppy.mp4")} type="video/mp4" /></video>
          <div className="motion-shade" />
          <h1 id="cover-title">timeless</h1><span className="sunmark" aria-hidden="true">✺</span>
          <p className="motion-note">Fine watches<br />Manila · Cebu · Davao</p>
        </div>
        <div className="cover-info">
          <h2>fine watches</h2>
          <p className="edition"><span className="mini-sun">✺</span> Collection I — Philippines</p>
          <p className="cover-deck">Every watch is more than an object. It is a dialogue between craft, character, and time—chosen to endure, to belong, to be passed on.</p>
        </div>
        <div className="cover-image">
          <Image src={asset("/swiss/732001264_1709394479981926_3822128851417537927_n.jpg")} alt="Patek Philippe Aquanaut from the Swiss Perpetual collection" fill priority unoptimized sizes="100vw" />
          <div className="coordinates"><span>14.5995° N</span><span>120.9842° E</span></div>
          <p className="cover-brand">swiss<br />perpetual</p>
          <p className="cover-caption">A curated collection<br />of classic and new<br />luxury timepieces.</p>
        </div>
      </section>

      <section className="point" aria-labelledby="point-title">
        <p className="eyebrow">01 — Point of view</p>
        <h2 id="point-title">Objects that<br />outlive the moment.</h2>
        <p className="point-copy">Not simply watches. Milestones, future heirlooms, and stories still being written. Every piece is selected with discretion and examined with care.</p>
        <p className="point-sign">Seconds that last.®</p>
      </section>

      <section className="collection" id="collection" aria-labelledby="collection-title">
        <header className="section-head"><p className="eyebrow">02 — The current edit</p><h2 id="collection-title">available now</h2><a href="https://www.swissperpetual.net/collection">View all ↗</a></header>
        <div className="catalogue">
          {watches.map((watch, index) => (
            <a className="piece" href={watch.href} key={watch.name}>
              <div className="piece-image"><Image src={asset(watch.image)} alt={`${watch.maker} ${watch.name}`} fill unoptimized sizes="(max-width: 700px) 100vw, 25vw" /><span>0{index + 1}</span><b>Explore ↗</b></div>
              <div className="piece-copy"><p>{watch.maker}</p><h3>{watch.name}</h3><small>{watch.meta}</small></div>
            </a>
          ))}
        </div>
      </section>

      <section className="journal" id="journal" aria-labelledby="journal-title">
        <header className="section-head inverse"><p className="eyebrow">03 — The perpetual journal</p><h2 id="journal-title">from the feed</h2><a href="https://www.instagram.com/swissperpetual/">Instagram ↗</a></header>
        <div className="story-layout">
          <a className="lead-story" href="https://www.instagram.com/swissperpetual/">
            <Image src={asset(stories[0].image)} alt="" fill unoptimized sizes="(max-width: 800px) 100vw, 66vw" />
            <div className="story-overlay"><span>01 / {stories[0].label}</span><h3>{stories[0].title}</h3><b>↗</b></div>
          </a>
          <div className="story-stack">
            {stories.slice(1).map((story, index) => <a href="https://www.instagram.com/swissperpetual/" key={story.title}><div className="story-thumb"><Image src={asset(story.image)} alt="" fill unoptimized sizes="(max-width: 800px) 100vw, 34vw" /></div><div><span>0{index + 2} / {story.label}</span><h3>{story.title}</h3></div></a>)}
          </div>
        </div>
        <p className="feed-note">Social posts arrive here as editorial stories—same imagery, Swiss Perpetual typography, and no third-party widget chrome.</p>
      </section>

      <section className="visit" id="visit" aria-labelledby="visit-title">
        <div className="visit-photo"><Image src={asset("/swiss/386469065_1150884049223128_5253316123175005677_n.jpg")} alt="Swiss Perpetual showroom" fill unoptimized sizes="(max-width: 800px) 100vw, 58vw" /></div>
        <div className="visit-panel"><p className="eyebrow">04 — Private viewing</p><h2 id="visit-title">take<br />your time.</h2><p>Visit us in Manila, Cebu, or Davao. Appointments are encouraged; conversation is never rushed.</p><div className="branches"><a href="https://www.swissperpetual.net/manila">Manila ↗</a><a href="https://www.swissperpetual.net/cebu">Cebu ↗</a><a href="https://www.swissperpetual.net/davao">Davao ↗</a></div><a className="book" href="https://www.swissperpetual.net/book-now">Book a private viewing ↗</a></div>
      </section>

      <footer><div className="footer-word"><span>swiss</span><span>perpetual</span></div><div className="footer-meta"><p>© 2026 Swiss Perpetual</p><a href="https://www.instagram.com/swissperpetual/">Instagram ↗</a><a href="https://www.swissperpetual.net/trade">Sell or trade ↗</a><a href="#top">Back to top ↑</a></div></footer>
    </main>
  );
}
