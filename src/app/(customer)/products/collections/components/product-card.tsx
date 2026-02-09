import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format-currency";
import { ProductImage, Variant } from "@/types/api";
import { imageUrlPrimary } from "@/utils/image-utils";
import { getMinMaxVariantPrice } from "@/utils/price-utils";
import Image from "next/image";
import Link from "next/link";
import { MdShoppingCartCheckout } from "react-icons/md";

type ProductCardCollectionProps = {
  id: number;
  images: ProductImage[];
  name: string;
  variant: Variant[] | undefined;
  category: string;
  layoutActive: string;
};

export const ProductCardCollection = (props: ProductCardCollectionProps) => {
  const { id, images, name, variant, category, layoutActive } = props;

  const cleanCategory = category.replace("_", " ").toUpperCase();

  const priceRange = getMinMaxVariantPrice(variant);
  return (
    <Link href={`/products/detail/${id}`}>
      <div
        className={`${layoutActive === "small" ? "h-[12rem] md:h-[16rem] lg:h-[20rem]" : layoutActive === "medium" ? "h-[20rem] md:h-[20rem] lg:h-[24rem]" : "h-[20rem] md:h-[28rem]"} rounded-md border shadow-xs`}
      >
        <div
          className={`${layoutActive === "small" ? "h-full" : layoutActive === "medium" ? "h-3/5 lg:h-3/4" : "h-3/4 "}  w-full relative rounded-md overflow-hidden`}
        >
          <div className="absolute top-0 right-0 z-10 p-1 lg:p-2">
            <Badge className="border-background text-xs">{cleanCategory}</Badge>
          </div>
          <Image
            src={imageUrlPrimary(images) || "/images/main-assets/no-image.svg"}
            fill
            alt="banner"
            className="object-cover object-center hover:scale-110 transition-all duration-300 ease-in-out"
          ></Image>
        </div>
        {layoutActive !== "small" && (
          <div
            className={`p-2 flex flex-col  ${layoutActive === "large" ? "h-1/4" : layoutActive === "medium" ? "h-2/5 lg:h-1/4" : "h-2/5 md:1/4"}`}
          >
            <p className="text-sm lg:text-base font-semibold ">{name}</p>
            <div className="flex flex-1 items-end w-full">
              <div className="flex w-full justify-between items-center">
                <p className="text-xs lg:text-sm font-medium">
                  {priceRange
                    ? priceRange.min === priceRange.max
                      ? formatCurrency(priceRange.min)
                      : `${formatCurrency(priceRange.min)} – ${formatCurrency(
                          priceRange.max,
                        )}`
                    : "Harga tidak tersedia"}
                </p>
                <Button
                  variant={"default"}
                  size={"icon-sm"}
                  className="p-1 rounded-full"
                >
                  <MdShoppingCartCheckout />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
