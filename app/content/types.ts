export type ProductInsightBlock = {
  id: string;
  label: string;
  value: string;
};

export type ManagedProduct = {
  id: string;
  slug: string;
  name: string;
  detail: string;
  material: string;
  family: number;
  image: string;
  gallery: string[];
  contentTitle: string;
  contentCopy: string;
  price: string;
  insightBlocks: ProductInsightBlock[];
  visible: boolean;
};

export type ManagedBrand = {
  slug: string;
  name: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  darkLogo: boolean;
  visible: boolean;
  archived: boolean;
  families: string[];
  products: ManagedProduct[];
};

export type VisitLocation = {
  id: string;
  code: string;
  city: string;
  image: string;
  lead: string;
  area: string;
  access: string;
  expectation: string;
  map: string;
  visible: boolean;
};

export type HomeContent = {
  navigationLogo: string;
  introLogo: string;
  introKicker: string;
  introCopy: string;
  heroVideo: string;
  heroPoster: string;
  heroCopy: string;
  watchHeading: [string, string, string];
  watchCopy: string;
  visitHeading: [string, string, string];
  featuredHeading: string;
  featuredIntroHeading: string;
  featuredIntroCopy: string;
  featuredBrands: string[];
  featuredLogos: Record<string, string>;
  visitLocations: VisitLocation[];
  storiesHeading?: string;
  stories?: { image: string; alt: string; href: string }[];
};

export type SiteContent = {
  version: 1;
  home: HomeContent;
  brands: ManagedBrand[];
};
