import { catalogues } from "../brandCatalogues";
import type { ManagedBrand, ManagedProduct, SiteContent } from "./types";
import { normalizeProductSlugs } from "./slugs";

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const product = (id: number, name: string, detail: string, family: number, image: string): ManagedProduct => ({
  id: String(id),
  slug: slugify(name),
  name,
  detail,
  material: "",
  family,
  image,
  gallery: [],
  contentTitle: "",
  contentCopy: "",
  price: "",
  insightBlocks: [
    { id: `model-${id}`, label: "Model", value: name },
    { id: `details-${id}`, label: "Details", value: detail },
  ],
  visible: true,
});

const rolexNames: [string, string, 0 | 1][] = [
  ["Oyster Perpetual 34", "Olive Green Dial / 2016", 1], ["Datejust 41", "Wimbledon / Rose Gold / 2020", 1],
  ["Datejust 36", "Mint Green Dial / 2024", 1], ["Milgauss 40", "Black Dial / 2020", 0],
  ["Datejust 41", "Wimbledon / 2025", 1], ["Datejust 41", "Chocolate Dial / 2021", 1],
  ["Datejust 41", "Black Wimbledon / 2011", 1], ["Datejust 36", "Classic Steel / 2011", 1],
  ["Datejust 36", "Mother of Pearl / 2020", 1], ["Daytona", "John Mayer / 2018", 0],
  ["Day-Date 40", "Chocolate Dial / 2019", 1], ["Datejust 36", "Classic Steel / 2010", 1],
  ["Sky-Dweller 42", "Oystersteel / 2022", 1], ["Daytona Cosmograph", "Chocolate Arabic Dial / 2017", 0],
  ["Submariner Date 40", "Oystersteel / 1991", 0], ["Air-King 40", "Black Dial / 2025", 0],
  ["Yacht-Master 40", "Oystersteel / 2017", 0], ["Datejust 36", "Turn-O-Graph / 2004", 1],
  ["Datejust 41", "Black Diamond Dial / 2019", 1], ["Datejust 41", "Two-Tone Rose Gold / 2018", 1],
  ["Datejust 36", "Yellow Gold / 1991", 1], ["Datejust 36", "Yellow Gold / 2017", 1],
  ["Datejust 36", "Silver Anniversary / 2008", 1], ["Datejust 31", "Chocolate Roman Dial / 2022", 1],
  ["Datejust 36", "Silver Roman Dial / 2011", 1], ["Datejust 31", "Floral Dial / 2018", 1],
  ["Datejust 31", "Pink Diamond Dial / 2019", 1], ["Day-Date 36", "Rose Gold / Pink Diamonds / 2011", 1],
  ["Datejust 36", "Black Anniversary / 2017", 1], ["Rolex 1908", "Perpetual Collection / 2025", 1],
  ["Yacht-Master 40", "Oystersteel / 2005", 0], ["Yacht-Master 40", "Oystersteel / 2006", 0],
];

const originals: ManagedBrand[] = [
  {
    slug: "audemars-piguet", name: "Audemars Piguet", logo: "/swiss/brands/audemars-piguet.png", logoWidth: 439, logoHeight: 175,
    darkLogo: true, visible: true, archived: false, families: ["Royal Oak", "Offshore"],
    products: [
      product(1, "Royal Oak Offshore Chronograph 42", "Chronograph / 42 mm / 2020", 1, "/swiss/audemars-piguet/ap-01.jpg"),
      product(2, "Royal Oak Leo Messi 41", "Limited edition / 41 mm / 2013", 0, "/swiss/audemars-piguet/ap-02.jpg"),
      product(3, "Royal Oak Offshore Chronograph 44", "Chronograph / 44 mm / 2015", 1, "/swiss/audemars-piguet/ap-03.jpg"),
      product(4, "Royal Oak Dual Time 39", "Dual time / 39 mm / 2011", 0, "/swiss/audemars-piguet/ap-04.jpg"),
    ],
  },
  {
    slug: "cartier", name: "Cartier", logo: "/swiss/brands/cartier.png", logoWidth: 480, logoHeight: 135,
    darkLogo: true, visible: true, archived: false, families: ["Santos", "Icons"],
    products: [
      product(1, "Santos Large (2024)", "Current selection / Details on request", 0, "/swiss/cartier/cartier-01.jpg"),
      product(2, "Santos ADLC Large (2020)", "Current selection / Details on request", 0, "/swiss/cartier/cartier-02.jpg"),
      product(3, "Santos Half ADLC Large (2023)", "Current selection / Details on request", 0, "/swiss/cartier/cartier-03.jpg"),
      product(4, "Cartier Selection 4", "Current selection / Details on request", 1, "/swiss/cartier/cartier-04.jpg"),
      product(5, "Tank Must Steel Large (2022)", "Current selection / Details on request", 1, "/swiss/cartier/cartier-05.jpg"),
      product(6, "Cartier Selection 6", "Current selection / Details on request", 1, "/swiss/cartier/cartier-06.jpg"),
      product(7, "Santos 100 Extra Large", "Current selection / Details on request", 0, "/swiss/cartier/cartier-07.jpg"),
      product(8, "Tank Louis (~2016)", "Current selection / Details on request", 1, "/swiss/cartier/cartier-08.jpg"),
      product(9, "Tank Louis Yellow Gold Medium (2013-2014)", "Current selection / Details on request", 1, "/swiss/cartier/cartier-09.jpg"),
    ],
  },
  {
    slug: "patek-philippe", name: "Patek Philippe", logo: "/swiss/brands/patek-philippe.png", logoWidth: 373, logoHeight: 198,
    darkLogo: true, visible: true, archived: false, families: ["Sport", "Classic"],
    products: [
      product(1, "Golden Ellipse", "Classic dress watch / 2018", 1, "/swiss/patek-philippe/patek-01.jpg"),
      product(2, "Aquanaut Travel Time 40.8", "Travel time / 40.8 mm / 2019", 0, "/swiss/patek-philippe/patek-02.jpg"),
    ],
  },
  {
    slug: "rolex", name: "Rolex", logo: "/swiss/brands/rolex.png", logoWidth: 367, logoHeight: 193,
    darkLogo: true, visible: true, archived: false, families: ["Sports", "Classic"],
    products: rolexNames.map((item, index) => {
      const piece = product(index + 1, item[0], item[1], item[2], `/swiss/rolex/rolex-${String(index + 1).padStart(2, "0")}.jpg`);
      if (index === 1) {
        return {
          ...piece,
          image: "/swiss/rolex/datejust-41-wimbledon-rose-gold/gallery-1.jpg",
          gallery: [
            "/swiss/rolex/datejust-41-wimbledon-rose-gold/gallery-2.jpg",
            "/swiss/rolex/datejust-41-wimbledon-rose-gold/gallery-3.jpg",
          ],
          material: "Oystersteel and Everose gold",
          contentTitle: "A modern classic, defined by contrast.",
          contentCopy: "The Datejust 41 pairs the warm character of Everose gold with the everyday resilience of Oystersteel. Its slate Wimbledon dial, Roman numerals, and domed bezel give the familiar Datejust architecture a distinct, quietly sporting presence.\n\nThis 2020 example is presented as a complete set and selected for its strong condition, balanced proportions, and enduring versatility.",
          price: "PHP 738,000",
          insightBlocks: [
            { id: "model-datejust-wimbledon", label: "Model", value: "Datejust 41 Wimbledon" },
            { id: "configuration-datejust-wimbledon", label: "Configuration", value: "Two-tone Everose gold" },
            { id: "reference-datejust-wimbledon", label: "Reference", value: "126301" },
            { id: "bezel-datejust-wimbledon", label: "Bezel", value: "Domed" },
            { id: "bracelet-datejust-wimbledon", label: "Bracelet", value: "Oyster" },
            { id: "size-datejust-wimbledon", label: "Size", value: "41 mm" },
            { id: "year-datejust-wimbledon", label: "Year", value: "2020" },
            { id: "set-datejust-wimbledon", label: "Set", value: "Complete set" },
            { id: "condition-datejust-wimbledon", label: "Condition", value: "9 / 10" },
          ],
        };
      }
      if (index !== 0) return piece;
      return {
        ...piece,
        slug: "oyster-perpetual-34",
        image: "/swiss/rolex/oyster-perpetual-34/gallery-1.jpg",
        gallery: [
          "/swiss/rolex/oyster-perpetual-34/gallery-2.jpg",
          "/swiss/rolex/oyster-perpetual-34/gallery-3.jpg",
        ],
        material: "Oystersteel",
        contentTitle: "Quiet proportions. A lasting presence.",
        contentCopy: "An understated 34 mm Oyster Perpetual selected for its balanced proportions and quietly distinctive olive-green dial. The clean display and familiar Oyster case make it a versatile everyday Rolex—considered, enduring, and easy to wear.\n\nEvery piece is examined for condition, character, and provenance before it enters the Swiss Perpetual collection.",
        price: "PHP 338,000",
        insightBlocks: [
          { id: "model", label: "Model", value: "Oyster Perpetual 34" },
          { id: "dial", label: "Dial", value: "Olive green" },
          { id: "reference", label: "Reference", value: "114200" },
          { id: "case", label: "Case", value: "Oystersteel / domed bezel" },
          { id: "size", label: "Size", value: "34 mm" },
          { id: "year", label: "Year", value: "2016" },
          { id: "set", label: "Set", value: "Complete set" },
          { id: "condition", label: "Condition", value: "9 / 10" },
        ],
      };
    }),
  },
];

const generated: ManagedBrand[] = Object.entries(catalogues).map(([slug, catalogue]) => ({
  slug,
  name: catalogue.brand,
  logo: catalogue.logo,
  logoWidth: catalogue.logoWidth ?? 600,
  logoHeight: catalogue.logoHeight ?? 600,
  darkLogo: true,
  visible: catalogue.products.length > 0,
  archived: catalogue.products.length === 0,
  families: [...catalogue.families],
  products: catalogue.products.map((item, index) => product(index + 1, item.name, item.detail, item.family, item.image ?? "")),
}));

const brandMap = new Map<string, ManagedBrand>();
[...generated, ...originals].forEach((brand) => brandMap.set(brand.slug, brand));

export const defaultSiteContent: SiteContent = {
  version: 1,
  home: {
    navigationLogo: "/swiss/swiss-perpetual-black-solid.png",
    introLogo: "/swiss/STLb.png",
    introKicker: "The Watch Boy Trio\nManila / Cebu / Davao",
    introCopy: "A curated collection of classic and new luxury timepieces, selected for character, craftsmanship, and enduring relevance.",
    heroVideo: "/swiss/Toppy.mp4",
    heroPoster: "/swiss/386469065_1150884049223128_5253316123175005677_n.jpg",
    heroCopy: "Fine objects\nconsidered slowly.",
    watchHeading: ["Watches with", "a life beyond", "the moment."],
    watchCopy: "",
    visitHeading: ["A step closer", "to your next", "luxury timepiece."],
    featuredHeading: "Featured Collection",
    featuredIntroHeading: "Find what's best for you.",
    featuredIntroCopy: "Swiss Perpetual brings together a multitude of luxury watch choices, from enduring maisons to modern icons. Discover distinct designs, histories, and points of view selected for collectors in Manila, Cebu, and Davao.",
    featuredBrands: ["audemars-piguet", "rolex", "cartier", "patek-philippe"],
    featuredLogos: Object.fromEntries([...brandMap.values()].map((brand) => [brand.slug, `/swiss/featured-brands/${brand.slug}.png`])),
    visitLocations: [
      { id: "manila", code: "MNL", city: "Manila", image: "/swiss/387789292_18007724104988679_3103763669942720122_n.jpg", lead: "A private setting for considered conversations and close inspection.", area: "Manila showroom", access: "Private viewings by appointment", expectation: "A focused edit of classic and contemporary luxury watches, presented at your pace.", map: "Swiss Perpetual Manila Philippines", visible: true },
      { id: "cebu", code: "CEB", city: "Cebu", image: "/swiss/sp+cebu.jpg", lead: "A quiet private showroom designed around an unhurried viewing experience.", area: "Cebu private showroom", access: "Personal appointments available", expectation: "Explore the collection with space to compare references, condition, and character.", map: "Swiss Perpetual Cebu Philippines", visible: true },
      { id: "davao", code: "DVO", city: "Davao", image: "/swiss/IMG_0557.JPG", lead: "A welcoming destination for collectors in the south.", area: "Davao showroom", access: "Private consultation available", expectation: "Discover selected pieces with a curator-led introduction and personal assistance.", map: "Swiss Perpetual Davao Philippines", visible: true },
    ],
  },
  brands: [...brandMap.values()].map((brand) => ({ ...brand, products: normalizeProductSlugs(brand.products) })).sort((a, b) => a.name.localeCompare(b.name)),
};

export const defaultBrand = (slug: string) => defaultSiteContent.brands.find((brand) => brand.slug === slug);
