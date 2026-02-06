import { Product } from "@/types/api";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const res = await fetch(`${baseUrl}/product`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products sitemap: ${res.status}`);
  }
  const text = await res.text();

  if (text.startsWith("<")) {
    throw new Error("API returned HTML instead of JSON");
  }

  const json = JSON.parse(text);
  const products: Product[] = json.data ?? [];

  const productUrls = products.map((p) => ({
    url: `https://idshopcase.com/product/detail/${p.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: "https://idshopcase.com",
      lastModified: new Date(),
    },
    ...productUrls,
  ];
}
