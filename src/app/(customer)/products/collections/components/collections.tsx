"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CollectionsProduct } from "@/features/products/components/collections-product";
import { useGetProducts } from "@/features/products/api/get-ptoducts";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LuSlidersHorizontal, LuArrowUpDown, LuCheck } from "react-icons/lu";

const CATEGORIES = [
  { id: "custom_case", label: "Custom Case", slug: "custom_case" },
  { id: "pop_socket", label: "Pop Socket", slug: "pop_socket" },
  { id: "keychain", label: "Keychain", slug: "keychain" },
  { id: "phone_charm", label: "Phone Charm", slug: "phone_charm" },
];

export const Collections = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentCategory = searchParams.get("category") || "";
  const [sortBy, setSortBy] = useState<"featured" | "price_asc" | "price_desc" | "name_asc">("featured");

  const { data: allProducts = [] } = useGetProducts();

  const handleCategorySelect = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === currentCategory) {
      params.delete("category"); // Deselect
    } else if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const activeCategories = currentCategory ? [currentCategory] : [];

  return (
    <div className="w-full min-h-screen bg-white font-[family-name:var(--font-fustat)] text-neutral-900 select-none pt-36 sm:pt-40 md:pt-44 pb-24">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
        {/* =========================================================================
            BAMBOO BLONDE FULL-WIDTH CONTROL BAR ([ ≡ FILTER ] ON LEFT, [ FEATURED ▾ ] ON RIGHT)
           ========================================================================= */}
        <div className="w-full flex items-center justify-between pb-5 mb-5 sm:mb-6">
          {/* Left: Minimalist FILTER Button */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="h-9 sm:h-10 px-4 sm:px-6 border border-neutral-900 flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-neutral-900 hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                <LuSlidersHorizontal className="w-3.5 h-3.5" />
                <span>FILTER</span>
                {currentCategory && (
                  <span className="w-1.5 h-1.5 rounded-full bg-black group-hover:bg-white ml-0.5" />
                )}
              </button>
            </SheetTrigger>

            {/* Slide-out Filter Sheet */}
            <SheetContent side="left" className="w-[300px] sm:w-[360px] p-6 font-[family-name:var(--font-fustat)]">
              <SheetHeader className="pb-6 border-b border-neutral-200">
                <SheetTitle className="text-sm font-bold uppercase tracking-[0.14em] text-neutral-900">
                  Filter by Category
                </SheetTitle>
              </SheetHeader>

              <div className="py-6 space-y-3">
                {/* All Products Option */}
                <button
                  type="button"
                  onClick={() => handleCategorySelect("")}
                  className={`w-full flex items-center justify-between py-2 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                    !currentCategory
                      ? "text-black font-bold"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  <span>All Products</span>
                  {!currentCategory && <LuCheck className="w-4 h-4" />}
                </button>

                {/* Category Options */}
                {CATEGORIES.map((cat) => {
                  const isSelected = currentCategory === cat.slug;
                  const count = allProducts.filter((p) => p.category === cat.slug).length;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`w-full flex items-center justify-between py-2 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                        isSelected
                          ? "text-black font-bold"
                          : "text-neutral-500 hover:text-neutral-900"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-neutral-400 font-normal">({count})</span>
                        {isSelected && <LuCheck className="w-4 h-4 text-black" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {currentCategory && (
                <div className="pt-6 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={handleClearFilter}
                    className="w-full h-10 border border-neutral-300 text-xs font-semibold uppercase tracking-wider text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </SheetContent>
          </Sheet>

          {/* Right: Minimalist Featured Dropdown */}
          <div className="flex items-center gap-2 border border-neutral-300 px-3 sm:px-4 h-9 sm:h-10 bg-white">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.08em] bg-transparent border-0 text-neutral-800 focus:outline-none cursor-pointer pr-1"
            >
              <option value="featured">Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A-Z</option>
            </select>
            <LuArrowUpDown className="w-3.5 h-3.5 text-neutral-500 pointer-events-none" />
          </div>
        </div>

        {/* =========================================================================
            BAMBOO BLONDE FULL-BLEED 4-COLUMN PRODUCT GRID
           ========================================================================= */}
        <CollectionsProduct
          categories={activeCategories}
          sortBy={sortBy}
          onResetFilters={handleClearFilter}
        />
      </div>
    </div>
  );
};
