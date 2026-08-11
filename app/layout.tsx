import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://wrmakokumagai-cell.github.io/horsemen-ranch";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Horsemen Ranch Country Club",
  description:
    "Small-run garments and field notes for people who take the scenic route.",
  icons: {
    icon: "/horsemen-ranch/favicon.svg",
    shortcut: "/horsemen-ranch/favicon.svg",
  },
  openGraph: {
    title: "Horsemen Ranch Country Club",
    description: "Made for the long way home.",
    type: "website",
    url: siteUrl,
    images: [`${siteUrl}/og-logo.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horsemen Ranch Country Club",
    description: "Made for the long way home.",
    images: [`${siteUrl}/og-logo.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
