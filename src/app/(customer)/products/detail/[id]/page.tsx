import { ProductDetail } from "./components/product";
import type { Metadata } from "next";
import { Product } from "@/types/api";
import { imageOpenGraph } from "@/utils/image-utils";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

<<<<<<< HEAD
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
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
=======
export async function generateMetadata(
  props: ProductPageProps
): Promise<Metadata> {
  const { id } = await props.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, {
    next: { revalidate: 60 },
  });
>>>>>>> 26c651c (refactor: improve address validation, implement payment status polling, update global font to Poppins, and add FAQ page support)

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
  } catch {
    return {
      title: "Detail Produk | IDSHOPCASE",
      description: "Detail Produk IDSHOPCASE",
    };
  }
}

const ProductPage = () => {
  return (
    <>
      <ProductDetail></ProductDetail>
    </>
  );
};

export default ProductPage;
