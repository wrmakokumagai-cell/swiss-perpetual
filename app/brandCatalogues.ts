export type CatalogueProduct = {
  name: string;
  detail: string;
  family: 0 | 1;
  image?: string;
};

export type Catalogue = {
  brand: string;
  logo: string;
  logoWidth?: number;
  logoHeight?: number;
  darkLogo?: boolean;
  families: readonly [string, string];
  products: readonly CatalogueProduct[];
};

const current = (name: string, family: 0 | 1, image: string): CatalogueProduct => ({
  name,
  family,
  image,
  detail: "Current selection / Details on request",
});

export const catalogues: Record<string, Catalogue> = {
  breitling: {
    brand: "Breitling",
    logo: "/swiss/brands/breitling.png",
    logoWidth: 435,
    logoHeight: 169,
    darkLogo: true,
    families: ["Professional", "Navitimer"],
    products: [
      current("Superocean 42", 0, "/swiss/catalogues/breitling/01.jpg"),
      current("Navitimer World 46 (2017)", 1, "/swiss/catalogues/breitling/02.jpg"),
      current("Navitimer 46 (2024)", 1, "/swiss/catalogues/breitling/03.jpg"),
      current("Navitimer World Black Dial 46 (2017)", 1, "/swiss/catalogues/breitling/04.jpg"),
    ],
  },
  bulgari: {
    brand: "Bulgari",
    logo: "/swiss/brands/bulgari.png",
    logoWidth: 470,
    logoHeight: 50,
    darkLogo: true,
    families: ["Octo", "Icons"],
    products: [],
  },
  "grand-seiko": {
    brand: "Grand Seiko",
    logo: "/swiss/brands/grand-seiko.png",
    logoWidth: 381,
    logoHeight: 162,
    darkLogo: true,
    families: ["Heritage", "Sport"],
    products: [
      current("Hi-Beat Diver 43.8 (2022)", 1, "/swiss/catalogues/grand-seiko/01.jpg"),
      current("Evolution 9 White Birch 40 (2024)", 0, "/swiss/catalogues/grand-seiko/02.jpg"),
    ],
  },
  iwc: {
    brand: "IWC",
    logo: "/swiss/brands/iwc.png",
    logoWidth: 376,
    logoHeight: 143,
    darkLogo: true,
    families: ["Pilot", "Classic"],
    products: [
      current("Portuguese Chronograph 41 (2010)", 1, "/swiss/catalogues/iwc/01.jpg"),
      current("Ingenieur 40 (2025)", 1, "/swiss/catalogues/iwc/02.jpg"),
      current("Pilot Chronograph 43 (2016)", 0, "/swiss/catalogues/iwc/03.jpg"),
      current("Pilot Double Chronograph 44 (2019)", 0, "/swiss/catalogues/iwc/04.jpg"),
      current("Portofino Chronograph 39 (2024)", 1, "/swiss/catalogues/iwc/05.jpg"),
    ],
  },
  "jaeger-lecoultre": {
    brand: "Jaeger-LeCoultre",
    logo: "/swiss/brands/jaeger-lecoultre.png",
    logoWidth: 480,
    logoHeight: 124,
    darkLogo: true,
    families: ["Reverso", "Round"],
    products: [],
  },
  omega: {
    brand: "Omega",
    logo: "/swiss/brands/omega.png",
    families: ["Speedmaster", "Seamaster"],
    products: [
      current("Speedmaster Day-Date", 0, "/swiss/catalogues/omega/01.jpg"),
      current("Speedmaster Hesalite 42 (2023)", 0, "/swiss/catalogues/omega/02.jpg"),
      current("Speedmaster Day-Date 39", 0, "/swiss/catalogues/omega/03.jpg"),
      current("Speedmaster Professional Moonwatch 42 (2023)", 0, "/swiss/catalogues/omega/04.jpg"),
      current("Speedmaster Selection 5", 0, "/swiss/catalogues/omega/05.jpg"),
      current("Speedmaster Moonphase 44.2 (2023)", 0, "/swiss/catalogues/omega/06.jpg"),
      current("Speedmaster Anniversary Series (2017)", 0, "/swiss/catalogues/omega/07.jpg"),
      current("Speedmaster Broad Arrow 42 (1999)", 0, "/swiss/catalogues/omega/08.jpg"),
      current("Speedmaster Selection 9", 0, "/swiss/catalogues/omega/09.jpg"),
    ],
  },
  panerai: {
    brand: "Panerai",
    logo: "/swiss/brands/panerai.png",
    logoWidth: 449,
    logoHeight: 51,
    darkLogo: true,
    families: ["Luminor", "Radiomir"],
    products: [
      current("Luminor Marina 1950 47 (2011)", 0, "/swiss/catalogues/panerai/01.jpg"),
      current("Luminor Submersible 42 (2019)", 0, "/swiss/catalogues/panerai/02.jpg"),
      current("Radiomir PAM1383 (2025)", 1, "/swiss/catalogues/panerai/03.jpg"),
    ],
  },
  tudor: {
    brand: "Tudor",
    logo: "/swiss/brands/tudor.png",
    logoWidth: 308,
    logoHeight: 171,
    darkLogo: true,
    families: ["Dive", "Heritage"],
    products: [
      current("Pelagos Blue Dial 42 (2025)", 0, "/swiss/catalogues/tudor/01.jpg"),
    ],
  },
  "vacheron-constantin": {
    brand: "Vacheron Constantin",
    logo: "/swiss/brands/vacheron-constantin.png",
    logoWidth: 480,
    logoHeight: 158,
    darkLogo: true,
    families: ["Sports", "Classic"],
    products: [],
  },
  others: {
    brand: "Other Maisons",
    logo: "/swiss/brands/others.png",
    families: ["Contemporary", "Classic"],
    products: [
      current("Baume & Mercier Capeland 44 (2013)", 1, "/swiss/catalogues/others/01.jpg"),
      current("Furlan Marri 37.5 (2022)", 0, "/swiss/catalogues/others/02.jpg"),
      current("Hublot Classic Fusion 45 (2023)", 0, "/swiss/catalogues/others/03.jpg"),
      current("Chopard Happy Sport 30", 1, "/swiss/catalogues/others/04.jpg"),
      current("Kurono Tokyo Calligra Special Project 34 (2024)", 0, "/swiss/catalogues/others/05.jpg"),
      current("Other Maison Selection", 0, "/swiss/catalogues/others/06.jpg"),
      current("Piaget Gouverneur Moonphase Triple Calendar (1985-1990)", 1, "/swiss/catalogues/others/07.jpg"),
    ],
  },
};


