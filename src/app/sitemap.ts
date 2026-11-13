import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://contact.edsong.xyz", changeFrequency: "monthly", priority: 1 },
    { url: "https://contact.edsong.xyz/portfolio", changeFrequency: "monthly", priority: 0.8 },
  ];
}
