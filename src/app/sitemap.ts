import { Product } from "@/types/api";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/product");
  const json = await res.json();
  const products = json.data;

  const productUrls = products.map((p: Product) => ({
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
