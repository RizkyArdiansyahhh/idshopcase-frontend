import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format-currency";
import { formatDate } from "@/lib/format-date";
import { OrderItem } from "@/types/api";
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
  orderItems: Array<OrderItem>;
  total_price: number;
};

export const CardOrder = (props: CardOrderProps) => {
  const { orderId, createdAt, status, address, orderItems, total_price } =
    props;
  const { push } = useRouter();

  const colorsPick: Record<string, string> = {
    pending: "yellow-200",
    paid: "green-200 ",
    shipped: "blue-200 ",
    delivered: "green-200",
    cancelled: "red-200 ",
  };
  return (
    <>
      <div className="border rounded-[12px] shadow-xs w-full overflow-hidden">
        <div className="p-4">
          <div className="flex flex-row justify-between items-center">
            <div>
              <p className="text-xs text-foreground/50">Order ID</p>
              <div className="flex flex-row gap-3 items-center text-foreground/70">
                <TbShoppingBag size={28} />
                <p className="text-md font-semibold">{`INV-${orderId}`}</p>
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <Badge variant={"outline"}>{formatDate(createdAt)}</Badge>
              <Badge
                variant={"outline"}
                className={`px-4 border-${colorsPick[status]}`}
              >
                <span
                  className={`inline-block h-3 w-3 rounded-full bg-${colorsPick[status]}`}
                ></span>
                {status}
              </Badge>
            </div>
          </div>
          <div className="p-2 flex flex-row justify-between items-center">
            <Badge variant={"outline"}>
              <Truck></Truck>
              <span className="ml-2">Jakarta Selatan</span>
            </Badge>
            <ArrowCustom></ArrowCustom>
            <Badge>
              <MapPin />
              <span>{address}</span>
            </Badge>
          </div>
          <div className="p-2">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="h-28 w-full border rounded-[12px] overflow-hidden flex flex-row gap-2 mb-2 "
              >
                <div className="h-full w-1/6 relative">
                  <Image
                    src={imageUrlPrimary(item.Product.ProductImages) ?? ""}
                    alt="product-1"
                    fill
                    className="object-center object-cover"
                  ></Image>
                </div>
                <div className="h-full w-5/6 flex flex-col justify-center">
                  <p className="text-sm font-semibold text-foreground/70">
                    {item.Product.name}
                  </p>
                  <div className="flex flex-row items-center gap-1">
                    <p className="font-semibold text-md">
                      {formatCurrency(Number(item.Product.price))}
                    </p>
                    <span className="text-xs font-medium text-foreground/50">
                      x1
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground/70">
                    Custom Case
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-16 bg-foreground/10 flex flex-row justify-between items-center px-4">
          <div className="flex flex-row gap-1 items-center">
            <span className="text-foreground font-semibold text-md">
              Total:{" "}
            </span>
            <span className="text-foreground font-semibold text-md">
              {formatCurrency(total_price)}
            </span>
            <span className="text-foreground/20 font-medium text-sm">
              ({orderItems.length} produk)
            </span>
          </div>
          <Button
            type="button"
            variant={"default"}
            className="rounded-full px-10"
            onClick={() => push(`/account/orders/detail/${orderId}`)}
          >
            Detail
          </Button>
        </div>
      </div>
    </>
  );
};
