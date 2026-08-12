import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.swissperpetual.net"),
  title: "Swiss Perpetual — Fine Watches",
  description: "Exceptional watches, thoughtfully sourced in Manila, Cebu, and Davao.",
  icons: { icon: "/swiss/favicon.ico" },
  openGraph: {
    title: "Swiss Perpetual — Seconds that last.",
    description: "Exceptional watches, thoughtfully sourced.",
    type: "website",
    images: [{ url: "/og.png", width: 1732, height: 908, alt: "Swiss Perpetual — Seconds that last." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swiss Perpetual — Seconds that last.",
    description: "Exceptional watches, thoughtfully sourced.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
