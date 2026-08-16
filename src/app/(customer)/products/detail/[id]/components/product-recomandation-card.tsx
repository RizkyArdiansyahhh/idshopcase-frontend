import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format-currency";
import { Product } from "@/types/api";
import { cleanImageUrl } from "@/utils/image-utils";
import { formatCategoryName } from "@/utils/category-utils";
import { getMinMaxVariantPrice } from "@/utils/price-utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ProductRecomandationCardProps = {
  product: Product;
  minPrice?: number;
  maxPrice?: number;
};

export const ProductRecomandationCard = (
  props: ProductRecomandationCardProps,
) => {
  const { product, minPrice = 0, maxPrice = 0 } = props;
  const { push } = useRouter();

  const primaryImage =
    product.ProductImages?.find((img) => img.isPrimary)?.imageUrl ??
    product.ProductImages?.[0]?.imageUrl;

  const priceObj = getMinMaxVariantPrice(product.Variants);
  const priceDisplay = priceObj
    ? priceObj.min === priceObj.max
      ? formatCurrency(priceObj.min)
      : `${formatCurrency(priceObj.min)} - ${formatCurrency(priceObj.max)}`
    : minPrice && maxPrice && minPrice > 0
    ? minPrice === maxPrice
      ? formatCurrency(minPrice)
      : `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`
    : "Harga tidak tersedia";

  return (
    <>
      <div
        key={product.id}
        onClick={() => push(`/products/detail/${product.id}`)}
        className="h-[20.5rem] sm:h-[22.5rem] xl:h-[26rem] flex flex-col p-2.5 rounded-xl border bg-background group hover:bg-foreground hover:text-background transition-all ease-in-out duration-300 hover:cursor-pointer shadow-2xs"
      >
        <div className="w-full h-36 sm:h-44 md:h-48 lg:h-52 relative rounded-lg overflow-hidden bg-muted">
          <Image
            src={cleanImageUrl(primaryImage)}
            alt={product.name}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="flex-1 flex justify-between flex-col">
          <div>
            <div>
              <p className="text-sm xl:text-lg font-semibold wrap-break-word mt-2 mb-1 line-clamp-1">
                {product.name}
              </p>
            </div>
            <div>
              <Badge
                variant="outline"
                className="transition-all duration-200 capitalize group-hover:bg-background group-hover:text-foreground group-hover:border-background"
              >
                {formatCategoryName(product.category)}
              </Badge>
            </div>
          </div>

          <div className="pt-4 md:pt-6 lg:pt-8 flex flex-col gap-2">
            <p className="text-xs lg:text-sm font-semibold wrap-break-word">
              {priceDisplay}
            </p>
            <Button
              variant={"default"}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                push(`/products/detail/${product.id}`);
              }}
              className="transition-all duration-200 group-hover:bg-background group-hover:text-foreground group-hover:border-background hover:bg-background w-full text-xs md:text-sm"
            >
              Beli sekarang
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
