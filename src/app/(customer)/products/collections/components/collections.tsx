"use client";
import { Button } from "@/components/ui/button";
import { CollectionsProduct } from "@/features/products/components/collections-product";
import Image from "next/image";
import { CiGrid2H, CiGrid2V, CiGrid41 } from "react-icons/ci";
import { FilterProduct } from "./filter";
import { use, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

export const Collections = () => {
  const [layoutActive, setLayoutActive] = useState<
    "small" | "medium" | "large"
  >("medium");
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  const categories = searchParams.getAll("category");

  return (
    <div className="w-screen h-fit">
      <div className="w-full h-[40vh] relative">
        <Image
          src={"/images/banner-collection.jpeg"}
          fill
          alt="banner"
          className="object-cover object-center"
        ></Image>

        <div className="w-[95%] md:w-[90%] h-16 md:h-20 bg-white z-10 absolute  bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border rounded-md shadow-md p-1 md:p-2 flex justify-between items-center px-4">
          <p className="text-base md:text-lg lg:text-3xl font-semibold">
            Koleksi Produk
          </p>
          <div className="rounded-full bg-transparent p-1 md:p-2 flex flex-row gap-2 border-2 border-foreground">
            <Button
              variant={layoutActive === "large" ? "default" : "outline"}
              size={isMobile ? "icon-sm" : "icon-lg"}
              className="rounded-full"
              onClick={() => setLayoutActive("large")}
            >
              <CiGrid2H className="text-2xl" />
            </Button>

            <Button
              variant={layoutActive === "medium" ? "default" : "outline"}
              size={isMobile ? "icon-sm" : "icon-lg"}
              className="rounded-full"
              onClick={() => setLayoutActive("medium")}
            >
              <CiGrid2V className="text-2xl" />
            </Button>

            <Button
              variant={layoutActive === "small" ? "default" : "outline"}
              size={isMobile ? "icon-sm" : "icon-lg"}
              className="rounded-full"
              onClick={() => setLayoutActive("small")}
            >
              <CiGrid41 className="text-2xl" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-row px-3 md:px-8 pt-14">
        <div className="hidden md:block h-fit w-1/4 lg:w-1/5 pr-5">
          <FilterProduct></FilterProduct>
        </div>

        <div className="h-screen w-full md:w-3/4 lg:w-4/5 ">
          <CollectionsProduct
            categories={categories}
            layoutActive={layoutActive}
          ></CollectionsProduct>
        </div>
      </div>
    </div>
  );
};
