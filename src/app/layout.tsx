import type { Metadata, Viewport } from "next";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://contact.edsong.xyz"),
  title: "Websites, web apps & your next big idea — Edward Song",
  description: "Have something in mind? Work with Edward Song to turn your idea into a thoughtful website, useful web app, or custom platform. Let's start a conversation.",
  alternates: { canonical: "/" },
  openGraph: { title: "Good ideas deserve a great website.", description: "Websites, web apps & your next big idea. Built with Edward Song.", url: "https://contact.edsong.xyz", siteName: "Edward Song", type: "website", images: [{ url: "/social.png", width: 1200, height: 630, alt: "Edward Song — Let's build something good." }] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#f5f4ed" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
