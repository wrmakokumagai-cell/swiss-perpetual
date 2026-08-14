import type { Metadata } from "next";
import ProductDetailPage from "../../ProductDetailPage";

export const metadata: Metadata = {
  title: "Rolex Oyster Perpetual 34 | Swiss Perpetual",
  description: "Explore the Rolex Oyster Perpetual 34 with olive-green dial at Swiss Perpetual in Manila, Cebu, and Davao.",
};

export default function OysterPerpetual34Page() {
  return <ProductDetailPage brandSlug="rolex" productId="1" />;
}
