import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/courses", "/pricing", "/teachers", "/about", "/contact"];
  return routes.map((route) => ({
    url: `https://aevian.com${route}`,
    lastModified: new Date(),
  }));
}
