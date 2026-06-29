import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      // Stable content date (not the build time) so lastmod stays a trustworthy signal.
      lastModified: new Date(siteConfig.lastUpdated),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
