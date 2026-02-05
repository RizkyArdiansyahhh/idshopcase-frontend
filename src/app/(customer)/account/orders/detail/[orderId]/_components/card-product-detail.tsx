import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format-currency";
import Image from "next/image";

type CardProductDetailProps = {
  imageUrl: string;
  productName: string;
  price: string;
  totalPrice: string;
  variant?: string | null;
  phoneType?: string | null;
  quantity: number;
};
export const CardProductDetail = (props: CardProductDetailProps) => {
  const {
    imageUrl,
    productName,
    price,
    totalPrice,
    variant,
    phoneType,
    quantity,
  } = props;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 border border-foreground/5 rounded-md">
        <div className="h-28 w-28 rounded-md relative overflow-hidden">
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
          <div className="w-full lg:w-2/3">
            <span className="block font-semibold text-sm md:text-base text-foreground/80 break-words">
              {productName}
            </span>
            <div className="text-foreground/50 font-medium text-xs flex flex-col gap-0.5 my-1">
              <span>{variant}</span>
              <span>{phoneType}</span>
            </div>
          </div>
          <div className=" w-1/3 hidden lg:flex flex-row justify-between">
            <div>
              <span className="font-semibold text-foreground/60">
                {formatCurrency(Number(price))}
              </span>
            </div>
            <div>
              <span className="font-semibold text-foreground/60">
                {quantity}
              </span>
            </div>
            <div>
              <span className="font-semibold text-foreground/80">
                {formatCurrency(Number(totalPrice) * Number(quantity || 0))}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full block lg:hidden">
        <Separator></Separator>
        <div className="w-full h-fit p-2 flex justify-end">
          <div className="w-2/4">
            <div className="w-full flex flex-row justify-between">
              <span className="text-sm font-semibold text-foreground/70">
                Subtotal :
              </span>
              <span className="text-sm font-semibold text-foreground">
                {formatCurrency(Number(price || 0))}
              </span>
            </div>
            <div className="w-full flex flex-row justify-between">
              <span className="text-sm font-semibold text-foreground/70">
                Quantity :
              </span>
              <span className="text-sm font-semibold text-foreground">
                {formatCurrency(Number(quantity || 0))}
              </span>
            </div>
            <div className="w-full flex flex-row justify-between">
              <span className="text-sm font-semibold text-foreground/70">
                Total :
              </span>
              <span className="text-sm font-semibold text-foreground">
                {formatCurrency(Number(totalPrice) * Number(quantity || 0))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
