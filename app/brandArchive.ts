export type ArchivedBrand = {
  slug: string;
  brand: string;
  logo: string;
  families: readonly [string, string];
  status: "no-current-pieces";
};

export const archivedBrands: readonly ArchivedBrand[] = [
  {
    slug: "bulgari",
    brand: "Bulgari",
    logo: "/swiss/brands/bulgari.png",
    families: ["Octo", "Icons"],
    status: "no-current-pieces",
  },
  {
    slug: "jaeger-lecoultre",
    brand: "Jaeger-LeCoultre",
    logo: "/swiss/brands/jaeger-lecoultre.png",
    families: ["Reverso", "Round"],
    status: "no-current-pieces",
  },
  {
    slug: "vacheron-constantin",
    brand: "Vacheron Constantin",
    logo: "/swiss/brands/vacheron-constantin.png",
    families: ["Sports", "Classic"],
    status: "no-current-pieces",
  },
];
