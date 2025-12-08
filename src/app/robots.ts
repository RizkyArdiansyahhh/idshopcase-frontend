import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/*",
        "/account",
        "/account/*",
        "/login",
        "/register",
        "/verify",
        "/auth/forgot-password",
        "/auth/reset-password",
        "/order",
        "/order/*",
      ],
    },
    sitemap: "http://idshopcase.com/sitemap.xml",
  };
}
