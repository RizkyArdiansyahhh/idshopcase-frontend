import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format-currency";
import { OrderItemAdmin } from "@/types/api";
import { cleanImageUrl, imageUrlPrimary } from "@/utils/image-utils";
import Image from "next/image";
import { format } from "path";
import CustomImages from "./custom-images";
import { PreviewImage } from "@/components/shared/preview-image";

type CardOrderItemProps = {
  item: OrderItemAdmin;
};
export const CardOrderItem = (props: CardOrderItemProps) => {
  const { item } = props;

  console.log(item.CustomImages, "item.CustomImages");

  return (
    <>
      <div className="border rounded-md p-2">
        <div className="border border-foreground/5 rounded-md p-3">
          <div className="w-full flex flex-row gap-2">
            <div className="h-16 w-16 relative rounded-md overflow-hidden">
              <Image
                src={imageUrlPrimary(item.Product.ProductImages) ?? ""}
                alt="product-1"
                fill
                className="object-cover object-center"
              ></Image>
            </div>
            <div className="w-full">
              <Badge variant={"outline"}>{item.Product.category}</Badge>
              <div className="flex flex-row justify-between items-center">
                <p className="text-sm text-foreground/80 font-medium">
                  {item.Product.name}
                </p>
                <p className="font-semibold">{`${
                  item.quantity
                } x ${formatCurrency(Number(item.Product.price))}`}</p>
              </div>

              <div>
                <div className="text-xs text-foreground/60 flex flex-col gap-0.5">
                  {item.PhoneType && <span>{item.PhoneType.model}</span>}
                  {item.Material && (
                    <>
                      <span>{item.Material.name}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {item.CustomImages && item.CustomImages.length > 0 && (
          <>
            <Separator className="my-2"></Separator>

            <div>
              <p className="text-xs text-foreground/80 font-semibold">
                File Custom Case Original Item #12
              </p>
              <CustomImages images={item.CustomImages}></CustomImages>
            </div>
          </>
        )}
      </div>
    </>
  );
};
