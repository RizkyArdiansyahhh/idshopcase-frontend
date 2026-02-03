import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format-currency";
import { Product } from "@/types/api";
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

  return (
    <>
      <div
        key={product.id}
        className="h-[22.5rem] xl:h-[26rem] 2xl:h-[40rem] flex flex-col p-2.5 rounded-[12px] border bg-background group hover:bg-foreground hover:text-background transition-all ease-in-out duration-400 hover:cursor-pointer"
      >
        <div className="w-full h-40 md:h-48 lg:h-52 relative rounded-[12px] overflow-hidden">
          {!product.ProductImages ? (
            <div className="absolute top-0 right-0 flex justify-center items-center w-full h-full">
              <p>No Image</p>
            </div>
          ) : (
            product.ProductImages.map((image) => {
              if (image.isPrimary) {
                const cleanPath = image.imageUrl?.split("/uploads/")[1] ?? null;
                const imageUrl = cleanPath ? `/images/${cleanPath}` : null;
                return (
                  <Image
                    key={image.id}
                    src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
                    alt="phone-charm"
                    fill
                    className="object-cover object-center"
                  ></Image>
                );
              }
            })
          )}
        </div>
        <div className="flex-1 flex justify-between flex-col ">
          <div>
            <div>
              <p className="text-sm xl:text-lg font-semibold wrap-break-word mt-2 mb-.5">
                {product.name}
              </p>
            </div>
            <div>
              <Badge
                variant="outline"
                className="transition-all duration-200 group-hover:bg-background group-hover:text-foreground group-hover:border-background"
              >
                {product.category.replace("_", " ")}
              </Badge>
            </div>
          </div>

          <div className="pt-4 md:pt-6 lg:pt-8 flex flex-col gap-2 ">
            <p className="text-xs lg:text-sm font-semibold wrap-break-word">
              {minPrice === maxPrice
                ? formatCurrency(minPrice)
                : formatCurrency(minPrice) + " - " + formatCurrency(maxPrice)}
            </p>
            <Button
              variant={"default"}
              type="button"
              onClick={() => push(`/products/detail/${product.id}`)}
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
