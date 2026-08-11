import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://wrmakokumagai-cell.github.io/horsemen-ranch";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Welcome to the Club",
  description:
    "Small-run garments and field notes for people who take the scenic route.",
  icons: {
    icon: {
      url: "/horsemen-ranch/sp-icon.png",
      type: "image/png",
    },
    shortcut: "/horsemen-ranch/sp-icon.png",
    apple: "/horsemen-ranch/sp-icon.png",
  },
  openGraph: {
    title: "Welcome to the Club",
    description: "Made for the long way home.",
    type: "website",
    url: siteUrl,
    images: [`${siteUrl}/og-logo.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Welcome to the Club",
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
