import { useGetProducts } from "../api/get-ptoducts";
import Loader from "@/components/shared/loaders";
import { ProductCardCollection } from "@/app/(customer)/products/collections/components/product-card";
import { useMemo } from "react";

type CollectionsProductProps = {
  layoutActive: "small" | "medium" | "large";
  categories: string[];
};

export const CollectionsProduct = ({
  layoutActive,
  categories,
}: CollectionsProductProps) => {
  const { data: products = [], isLoading } = useGetProducts();

  const filteredProducts = useMemo(() => {
    if (categories.length === 0) return products;

    return products.filter((product) => categories.includes(product.category));
  }, [products, categories]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center h-[30vh] items-center">
        <Loader />
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return <h1>Produk Tidak Ditemukan</h1>;
  }

  return (
    <div
      className={`
        w-full min-h-0 grid pb-10
        ${
          layoutActive === "large"
            ? "grid-cols-1 gap-5 md:grid-cols-2 md:gap-5"
            : layoutActive === "medium"
              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
              : "grid-cols-3 gap-1 md:grid-cols-4 lg:grid-cols-5 md:gap-5"
        }
      `}
    >
      {filteredProducts.map((product) => (
        <ProductCardCollection
          key={product.id}
          id={product.id}
          images={product.ProductImages}
          variant={product.Variants}
          name={product.name}
          category={product.category}
          layoutActive={layoutActive}
        />
      ))}
    </div>
  );
};
