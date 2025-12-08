import { ProductDetail } from "./components/product";
import type { Metadata } from "next";
import { Product } from "@/types/api";
import { imageOpenGraph } from "@/utils/image-utils";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return {
      title: "Produk tidak ditemukan",
      description: "Produk ini mungkin sudah tidak tersedia.",
    };
  }

  const json = await res.json();
  const product: Product = json.data;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      images: [...imageOpenGraph(product.ProductImages)],
      url: `https://idshopcase.com/products/detail/${product.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: imageOpenGraph(product.ProductImages).map((i) => i.url),
    },
  };
}

const ProductPage = () => {
  return (
    <>
      <ProductDetail></ProductDetail>
    </>
  );
};

export default ProductPage;
