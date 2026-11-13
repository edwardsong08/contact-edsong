import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://contact.edsong.xyz"),
  title: "Your next idea. Beautifully built. — Edward Song",
  description: "Websites and web apps, designed around you. From a simple first page to a complete platform. Work with independent developer Edward Song.",
  alternates: { canonical: "/" },
  openGraph: { title: "Your next idea. Beautifully built.", description: "Websites and web apps, designed around you. Built by Edward Song.", url: "https://contact.edsong.xyz", siteName: "Edward Song", type: "website", images: [{ url: "/social.png", width: 1200, height: 630, alt: "Edward Song — Your next idea. Beautifully built." }] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#fbfbfd" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
