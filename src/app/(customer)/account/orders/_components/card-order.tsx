import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format-currency";
import { formatDate, timeAgo } from "@/lib/format-date";
import { OrderItem, OrderItemAdmin } from "@/types/api";
import { imageUrlPrimary } from "@/utils/image-utils";
import { MapPin, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TbShoppingBag } from "react-icons/tb";

export const ArrowCustom = () => {
  return (
    <div className="flex items-center gap-1">
      <span className="h-2 w-2 rounded-full bg-foreground" />

      <svg
        width="40"
        height="2"
        viewBox="0 0 40 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="1"
          x2="38"
          y2="1"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>

      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-foreground"
      >
        <path d="M0 0L8 4L0 8V0Z" fill="currentColor" />
      </svg>
    </div>
  );
};

type CardOrderProps = {
  orderId: string;
  createdAt: string;
  status: string;
  address: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orderItems: OrderItemAdmin[];
  total_price: number;
};

export const CardOrder = (props: CardOrderProps) => {
  const { orderId, createdAt, status, address, orderItems, total_price } =
    props;
  const { push } = useRouter();

  return (
    <>
      <div className="border rounded-none md:rounded-md shadow-xs w-full overflow-hidden">
        <div className="p-1 md:p-2 lg:p-4">
          <div className="flex px-2 md:px-0 flex-col md:flex-row md:justify-between md:items-center">
            <div className="">
              <p className="text-xs text-foreground/50">Order ID</p>
              <div className="flex flex-row gap-1 md:gap-1.5 lg:gap-2 items-center text-foreground/70">
                <TbShoppingBag className="text-base md:text-lg lg:text-xl" />
                <p className="text-xs md:text-sm font-semibold">{`INV-${orderId}`}</p>
              </div>
            </div>
            <div className="flex flex-row gap-3 justify-end">
              <Badge className="text-xs" variant={"outline"}>
                {timeAgo(createdAt)}
              </Badge>
            </div>
          </div>
          <div className="hidden md:flex p-2  flex-row justify-between items-center">
            <Badge variant={"outline"}>
              <Truck></Truck>
              <span className="ml-2">Jawa Barat</span>
            </Badge>
            <ArrowCustom></ArrowCustom>
            <Badge>
              <MapPin />
              <span className="text-xs">{address}</span>
            </Badge>
          </div>
          <div className="px-2 pb-1 pt-1.5">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="h-20 md:h-24 w-full border rounded-sm md:rounded-md overflow-hidden flex flex-row gap-2 mb-0 md:mb-2 "
              >
                <div className="h-full w-1/5  lg:w-[12%] relative">
                  <Image
                    src={imageUrlPrimary(item.Product.ProductImages) ?? ""}
                    alt="product-1"
                    fill
                    className="object-center object-cover"
                  ></Image>
                </div>
                <div className="h-full w-3/5 lg:w-5/6 flex flex-col justify-start py-1">
                  <p className="text-xs md:text-sm font-semibold text-foreground/70">
                    {item.Product.name}
                  </p>
                  <div className="hidden md:flex flex-row items-center gap-1">
                    <p className="font-semibold text-xs md:text-md">
                      {formatCurrency(Number(item.Variant.price))}
                    </p>
                    <span className="text-xs font-medium text-foreground/50">
                      x1
                    </span>
                  </div>
                  <div className="flex flex-col gap-.5">
                    {item.Variant && (
                      <p className="text-xs font-medium text-foreground/70">
                        {item.Variant.name}
                      </p>
                    )}
                    {item.PhoneType && (
                      <>
                        <p className="text-xs font-medium text-foreground/70">
                          {item.PhoneType.model}
                        </p>
                      </>
                    )}
                  </div>
                  {}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-fit py-3 lg:py-5 bg-foreground/5 flex flex-col md:flex-row md:justify-between md:items-center px-4">
          <div className="flex flex-row gap-1 items-center">
            <span className="text-foreground font-semibold text-sm lg:text-base">
              Total:{" "}
            </span>
            <span className="text-foreground font-semibold text-sm lg:text-base">
              {formatCurrency(total_price)}
            </span>
            <span className="text-foreground/20 font-medium text-xs lg:text-sm">
              ({orderItems.length} produk)
            </span>
          </div>
          <div className="flex flex-row justify-end ">
            <Button
              type="button"
              variant={"default"}
              className="rounded-md px-4 md:px-7 lg:px-10 text-xs lg:text-sm w-fit"
              onClick={() => push(`/account/orders/detail/${orderId}`)}
            >
              {status === "pending" ? "Menunggu Pembayaran" : "Detail"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
