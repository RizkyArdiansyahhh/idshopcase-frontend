"use client";

import React, { useMemo, useState } from "react";
import { useGetProducts } from "../api/get-ptoducts";
import { ProductCardCollection } from "@/app/(customer)/products/collections/components/product-card";
import { SkeletonProduct } from "@/components/shared/skeleton-product";
import { getMinMaxVariantPrice } from "@/utils/price-utils";
import { QuickViewModal } from "./quick-view-modal";
import { Product } from "@/types/api";
import { LuSparkles } from "react-icons/lu";

type CollectionsProductProps = {
  categories?: string[];
  sortBy?: "featured" | "price_asc" | "price_desc" | "name_asc";
  searchQuery?: string;
  onResetFilters?: () => void;
};

export const CollectionsProduct = ({
  categories = [],
  sortBy = "featured",
  searchQuery = "",
  onResetFilters,
}: CollectionsProductProps) => {
  const { data: products = [], isLoading } = useGetProducts();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by Category
    if (categories.length > 0) {
      result = result.filter((product) => categories.includes(product.category));
    }

    // 2. Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(q) ||
          product.category?.toLowerCase().includes(q) ||
          product.description?.toLowerCase().includes(q)
      );
    }

    // 3. Sort Results
    result.sort((a, b) => {
      const priceA = getMinMaxVariantPrice(a.Variants)?.min || 0;
      const priceB = getMinMaxVariantPrice(b.Variants)?.min || 0;

      if (sortBy === "price_asc") return priceA - priceB;
      if (sortBy === "price_desc") return priceB - priceA;
      if (sortBy === "name_asc") return a.name.localeCompare(b.name);
      return 0; // "featured"
    });

    return result;
  }, [products, categories, searchQuery, sortBy]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 sm:gap-x-5 lg:gap-x-6 gap-y-8 sm:gap-y-12 w-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonProduct key={i} />
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-center space-y-4 font-[family-name:var(--font-fustat)]">
        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
          <LuSparkles className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-neutral-900">
            No Products Found
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm">
            No products match the selected filter. Try clearing your filters.
          </p>
        </div>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="px-5 py-2 border border-neutral-900 text-neutral-900 text-xs uppercase font-semibold tracking-widest hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            Clear Filter
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-3 sm:gap-x-5 lg:gap-x-6 gap-y-8 sm:gap-y-12">
        {filteredProducts.map((product) => (
          <ProductCardCollection
            key={product.id}
            product={product}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ))}
      </div>

      {/* Interactive Quick View Modal Dialog */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
};
