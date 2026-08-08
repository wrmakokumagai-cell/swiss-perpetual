import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const stories = [
  {
    src: asset("/images/story-space.png"),
    productSrc: asset("/images/story-product-space-clean.png"),
    productAlt: "Black Space Man shirt",
    alt: "Crowd watching a rocket launch through a glass observation window",
    number: "01",
    kicker: "Field Notes",
    title: "A watch for the impossible",
    detail: "Cape Canaveral / 1969",
  },
  {
    src: asset("/images/story-monument.png"),
    productSrc: asset("/images/story-product-cart-clean.png"),
    productAlt: "Beige Cart Classic shirt",
    alt: "Gallery visitor wearing a Horsemen Ranch shirt beside a monumental sculpture",
    number: "02",
    kicker: "The Arts",
    title: "Monument of hope",
    detail: "The modern collection",
  },
  {
    src: asset("/images/story-oyster.png"),
    productSrc: asset("/images/story-product-oyster-clean.png"),
    productAlt: "Off-white Oyster Sauce shirt",
    alt: "Sailor balancing on a yacht in a Horsemen Ranch Oyster shirt",
    number: "03",
    kicker: "Open Water",
    title: "Oyster hunting season",
    detail: "Oyster Coast / Summer",
  },
];

export default function Home() {
  return (
    <main>
      <div className="announcement">
        <span className="announcement-center">24/7 365 - Q3 2026</span>
      </div>

      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Horsemen Ranch home">
          <Image
            className="nav-logo"
            src={asset("/images/nav-mark.png")}
            alt=""
            width={6816}
            height={3058}
            priority
            unoptimized
          />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#collection">Collection</a>
          <a href="#journal">Journal</a>
          <a href="#about">The Ranch</a>
        </nav>
        <div className="header-actions">
          <a href="#club">Join the club</a>
        </div>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src={asset("/images/equestrian-hero.png")}
          alt="A rider in Horsemen Ranch apparel seated beside a horse in a warm country stable"
          fill
          priority
          unoptimized
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow light">Swiss Engineering Featurette Q3 2026</p>
          <h1 className="sr-only" id="hero-title">Horsemen Ranch Country Club</h1>
          <Image
            className="hero-logo"
            src={asset("/images/rancho-wordmark.png")}
            alt="Horsemen Ranch Country Club"
            width={8104}
            height={2120}
            priority
            unoptimized
            sizes="(max-width: 640px) 92vw, 76vw"
          />
          <a className="outline-button" href="#collection">
            Enter the collection <span aria-hidden="true">↘</span>
          </a>
        </div>
        <div className="hero-foot">
          <span>Limited runtime only</span>
          <span>14.5995° N / 120.9842° E</span>
          <span>Scroll to wander ↓</span>
        </div>
      </section>

      <section className="intro" id="about">
        <div className="intro-aside">
          <p className="section-label">Our point of view</p>
          <Image
            className="intro-emblem"
            src={asset("/images/sphm-emblem.png")}
            alt="SP x HM 2026 globe emblem"
            width={1308}
            height={1494}
            unoptimized
          />
        </div>
        <p className="intro-copy">
          We don&apos;t make clothes for perfect moments. We make them for the ones
          you&apos;ll remember. Horsemen Ranch is built on hard work, good company,
          open roads, and stories worth telling.
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
          <h2 id="journal-title">The perfect threesome</h2>
          <p>Stories behind Edition 01</p>
        </div>
        <div className="story-grid">
          {stories.map((story) => (
            <article
              className="story-card"
              key={story.number}
              tabIndex={0}
              aria-label={`Preview ${story.title}: ${story.productAlt}`}
            >
              <div className="story-image-wrap">
                <Image
                  className="story-image"
                  src={story.src}
                  alt={story.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 720px) 100vw, 33vw"
                />
                <span className="story-frost" aria-hidden="true" />
                <Image
                  className={`story-product story-product--${story.number}`}
                  src={story.productSrc}
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width: 720px) 82vw, 28vw"
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

      <section className="interlude" aria-label="Horsemen collaboration billboard">
        <Image
          className="interlude-image"
          src={asset("/images/billboard-panel.png")}
          alt="Horsemen collaboration billboard in an open field beneath a wide blue sky"
          fill
          unoptimized
          sizes="100vw"
        />
        <Image
          className="billboard-watermark"
          src={asset("/images/nav-mark.png")}
          alt=""
          width={6816}
          height={3058}
          unoptimized
        />
      </section>

      <section className="collection" id="collection" aria-labelledby="collection-title">
        <div className="section-heading collection-heading">
          <p className="section-label">Edition 01</p>
          <h2 id="collection-title">The Collaboration</h2>
          <a href="#club">View all pieces ↗</a>
        </div>
        <div className="collection-feature">
          <div className="collection-image-wrap">
            <Image
              className="collection-image collection-image-base"
              src={asset("/images/collaboration-feature.png")}
              alt="Three Horsemen Ranch collaboration shirts displayed in an open desert landscape"
              fill
              unoptimized
              sizes="(max-width: 800px) 100vw, 66vw"
            />
            <Image
              className="collection-image product-image product-image--space"
              src={asset("/images/hover-space-man.png")}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 800px) 100vw, 66vw"
            />
            <Image
              className="collection-image product-image product-image--cart"
              src={asset("/images/hover-cart-classic.png")}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 800px) 100vw, 66vw"
            />
            <Image
              className="collection-image product-image product-image--oyster"
              src={asset("/images/hover-oyster-sauce.png")}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 800px) 100vw, 66vw"
            />
            <span className="image-caption">Swiss Collab 1</span>
          </div>
          <div className="product-list">
            <button type="button">
              <span>01</span>
              <strong>Space Man</strong>
              <span>Black</span>
              <span title="Preorder">PO</span>
            </button>
            <button type="button">
              <span>02</span>
              <strong>Cart Classic</strong>
              <span>Beige</span>
              <span title="Preorder">PO</span>
            </button>
            <button type="button">
              <span>03</span>
              <strong>Oyster Sauce</strong>
              <span>Offwhite</span>
              <span title="Preorder">PO</span>
            </button>
            <p className="product-note">
              Through our Swiss engineering partnership, we deliver exceptional
              precision with virtually unlimited design possibilities.
            </p>
          </div>
        </div>
      </section>

      <section className="club-visual" id="club" aria-label="Horsemen Ranch open country">
        <Image
          className="club-visual-image"
          src={asset("/images/open-country-club-v2.png")}
          alt="A lone figure crossing a wide golden field beneath a mountain range"
          fill
          unoptimized
          sizes="100vw"
        />
      </section>

      <footer>
        <Image
          className="footer-logo"
          src={asset("/images/rancho-wordmark.png")}
          alt="Horsemen Ranch Country Club"
          width={8104}
          height={2120}
          unoptimized
          sizes="(max-width: 640px) 94vw, 86vw"
        />
        <div className="footer-links">
          <a href="#top">Instagram</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Horsemen Ranch Country Club</span>
          <span>A timely collaboration made just for you</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
