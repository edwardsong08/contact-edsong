import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://edsong.xyz", changeFrequency: "monthly", priority: 1 },
    { url: "https://edsong.xyz/portfolio", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://edsong.xyz/about", changeFrequency: "monthly", priority: 0.6 },
    { url: "https://edsong.xyz/resume", changeFrequency: "monthly", priority: 0.5 },
  ];
}
