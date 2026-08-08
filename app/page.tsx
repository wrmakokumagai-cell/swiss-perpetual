import Image from "next/image";

const stories = [
  {
    src: "/images/gallery-omega.png",
    alt: "Crowd watching a rocket launch through a glass observation window",
    number: "01",
    kicker: "Field Notes",
    title: "A watch for the impossible",
    detail: "Cape Canaveral / 1969",
  },
  {
    src: "/images/gallery-cartier.png",
    alt: "Gallery visitor wearing a Horsemen Ranch shirt beside a monumental sculpture",
    number: "02",
    kicker: "The Arts",
    title: "Keep strange company",
    detail: "The modern collection",
  },
  {
    src: "/images/gallery-rolex.png",
    alt: "Sailor balancing on a yacht in a Horsemen Ranch Oyster shirt",
    number: "03",
    kicker: "Open Water",
    title: "Out past the break",
    detail: "Oyster Coast / Summer",
  },
];

export default function Home() {
  return (
    <main>
      <div className="announcement">
        <span>Complimentary shipping on orders over $150</span>
        <span className="announcement-center">The club is always open</span>
        <span>Edition 01 — Summer 2026</span>
      </div>

      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Horsemen Ranch home">
          HR
        </a>
        <nav aria-label="Primary navigation">
          <a href="#collection">Collection</a>
          <a href="#journal">Journal</a>
          <a href="#about">The Ranch</a>
        </nav>
        <div className="header-actions">
          <a href="#club">Join the club</a>
          <a className="bag" href="#collection" aria-label="Shopping bag, empty">
            Bag <span>(0)</span>
          </a>
        </div>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src="/images/horsemen-hero.png"
          alt="A collection of Horsemen Ranch graphic shirts displayed in a weathered country clubhouse"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow light">Private goods for public living</p>
          <h1 id="hero-title">Horsemen Ranch</h1>
          <p className="script-mark">Country Club</p>
          <a className="outline-button" href="#collection">
            Enter the collection <span aria-hidden="true">↘</span>
          </a>
        </div>
        <div className="hero-foot">
          <span>Est. somewhere out west</span>
          <span>34.0522° N / 118.2437° W</span>
          <span>Scroll to wander ↓</span>
        </div>
      </section>

      <section className="intro" id="about">
        <p className="section-label">Our point of view</p>
        <p className="intro-copy">
          Clothes with a past, made for the stories still ahead. Horsemen Ranch
          borrows from the clubhouses, coastlines, paddocks, and parking lots
          that taught us how to live well without taking it too seriously.
        </p>
        <div className="intro-signoff">
          <span>Good company.</span>
          <span>Long afternoons.</span>
          <span>No dress code.</span>
        </div>
      </section>

      <section className="journal" id="journal" aria-labelledby="journal-title">
        <div className="section-heading">
          <p className="section-label">The club journal</p>
          <h2 id="journal-title">Three ways to disappear</h2>
          <p>Stories behind Edition 01</p>
        </div>
        <div className="story-grid">
          {stories.map((story) => (
            <article className="story-card" key={story.number}>
              <div className="story-image-wrap">
                <Image
                  className="story-image"
                  src={story.src}
                  alt={story.alt}
                  fill
                  sizes="(max-width: 720px) 100vw, 33vw"
                />
                <span className="story-number">{story.number}</span>
              </div>
              <div className="story-meta">
                <div>
                  <p>{story.kicker}</p>
                  <h3>{story.title}</h3>
                </div>
                <span>{story.detail}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="interlude" aria-label="Horsemen Ranch motto">
        <div>
          <p className="section-label light">The standing invitation</p>
          <p className="interlude-copy">
            Stay late.<br />
            Leave early.<br />
            <em>Bring something back.</em>
          </p>
        </div>
        <div className="interlude-note">
          <span className="stamp">H / R</span>
          <p>
            A seasonal uniform for people who collect stories, take the scenic
            route, and know the best table is usually outside.
          </p>
        </div>
      </section>

      <section className="collection" id="collection" aria-labelledby="collection-title">
        <div className="section-heading collection-heading">
          <p className="section-label">Edition 01</p>
          <h2 id="collection-title">The clubhouse collection</h2>
          <a href="#club">View all pieces ↗</a>
        </div>
        <div className="collection-feature">
          <div className="collection-image-wrap">
            <Image
              className="collection-image"
              src="/images/clubhouse-products.png"
              alt="Horsemen Ranch graphic shirts displayed in a country clubhouse"
              fill
              sizes="(max-width: 800px) 100vw, 66vw"
            />
            <span className="image-caption">The full stable / Edition 01</span>
          </div>
          <div className="product-list">
            <a href="#club">
              <span>01</span>
              <strong>Moon Mission Tee</strong>
              <span>Black</span>
              <span>$68</span>
            </a>
            <a href="#club">
              <span>02</span>
              <strong>Maison Racing Tee</strong>
              <span>Natural</span>
              <span>$68</span>
            </a>
            <a href="#club">
              <span>03</span>
              <strong>Oyster Coast Tee</strong>
              <span>Bone</span>
              <span>$72</span>
            </a>
            <a href="#club">
              <span>04</span>
              <strong>Field Jacket</strong>
              <span>Tobacco</span>
              <span>$240</span>
            </a>
            <p className="product-note">
              Small-run garments, washed for softness and made to get better
              with a little trouble.
            </p>
          </div>
        </div>
      </section>

      <section className="club" id="club">
        <p className="section-label light">Members correspondence</p>
        <div>
          <h2>Letters from the ranch.</h2>
          <p>New editions, field notes, and the occasional good idea.</p>
        </div>
        <form className="signup">
          <label className="sr-only" htmlFor="email">
            Email address
          </label>
          <input id="email" type="email" placeholder="Your email address" required />
          <button type="submit" aria-label="Join the Horsemen Ranch mailing list">
            Join ↗
          </button>
        </form>
      </section>

      <footer>
        <p className="footer-logo">Horsemen Ranch</p>
        <div className="footer-links">
          <a href="#collection">Shop</a>
          <a href="#journal">Stories</a>
          <a href="#club">Contact</a>
          <a href="#top">Instagram</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Horsemen Ranch Country Club</span>
          <span>Made for the long way home.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
