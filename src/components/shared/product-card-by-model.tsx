import { formatCurrency } from "@/lib/format-currency";
import Image from "next/image";
import Link from "next/link";

type ProductCardByModelProps = {
  id: number;
  name: string;
  image: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  price: any;
};

export const ProductCardByModel = (props: ProductCardByModelProps) => {
  const { id, name, image, price } = props;
  return (
    <div className="h-full w-full">
      <div className="w-full h-full flex flex-col justify-center">
        <div className="w-full h-[60%] relative rounded-xs overflow-hidden group">
          <Image
            src={image[0] ?? "/images/main-assets/no-image.svg"}
            fill
            alt="product-default"
            className="object-cover transition-all duration-150 group-hover:opacity-0 group-hover:scale-105"
          />

          <Image
            src={image[1] ?? "/images/main-assets/no-image.svg"}
            fill
            alt="product-hover"
            className="object-cover absolute inset-0 opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:scale-105"
          />
        </div>

        <div className="px-3 w-full h-fit flex flex-col py-3">
          <p className="font-light text-lg break-words leading-5 mb-1.5 text-center">
            {name}
          </p>
          <p className="text-base font-medium text-foreground/80 text-center">
            {price
              ? price.min === price.max
                ? formatCurrency(price.min)
                : `${formatCurrency(price.min)} – ${formatCurrency(price.max)}`
              : "Harga tidak tersedia"}
          </p>
          <Link
            href={`/products/detail/${id}`}
            className="transition-all w-full rounded-xs duration-300 ease-in-out hover:bg-background hover:text-foreground  mt-1 px-2 py-3 text-center bg-foreground text-background font-medium border text-sm"
          >
            Lihat Produk
          </Link>
        </div>
      </div>
    </div>
  );
};
