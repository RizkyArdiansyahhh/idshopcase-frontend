import { formatCurrency } from "@/lib/format-currency";
import Image from "next/image";

type CardProductDetailProps = {
  imageUrl: string;
  productName: string;
  price: string;
  material?: string | null;
  variant?: string | null;
  phoneType?: string | null;
  quantity: number;
};
export const CardProductDetail = (props: CardProductDetailProps) => {
  const {
    imageUrl,
    productName,
    price,
    material,
    variant,
    phoneType,
    quantity,
  } = props;

  return (
    <>
      <div className="flex flex-row gap-2 border border-foreground/5 rounded-md">
        <div className="h-28 w-28 rounded-xs relative overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="product-1"
              fill
              className="object-cover object-center"
            ></Image>
          )}
        </div>

        <div className="flex-1 flex flex-row justify-between p-2">
          <div>
            <span className="font-semibold text-foreground/80">
              {productName}
            </span>
            <div className="text-foreground/50 font-medium text-xs flex flex-col gap-0.5 my-1">
              <span>Material</span>
              <span>Phone Type</span>
            </div>
          </div>
          <div>
            <span className="font-semibold text-foreground/60">
              {formatCurrency(Number(price))}
            </span>
          </div>
          <div>
            <span className="font-semibold text-foreground/60">{quantity}</span>
          </div>
          <div>
            <span className="font-semibold text-foreground/80">
              {formatCurrency(Number(price) * Number(quantity))}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
