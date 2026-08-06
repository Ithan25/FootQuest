import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://footquest.fr";

  // Use fixed dates to avoid signaling false content changes on every crawl
  const contentUpdate = new Date("2026-05-19");
  const legalUpdate = new Date("2026-04-01");

  return [
    {
      url: baseUrl,
      lastModified: contentUpdate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: contentUpdate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: contentUpdate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guide/comment-jouer`,
      lastModified: contentUpdate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guide/systeme-de-points`,
      lastModified: contentUpdate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/coupe-du-monde-2026`,
      lastModified: contentUpdate,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: legalUpdate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: legalUpdate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cgu`,
      lastModified: legalUpdate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
