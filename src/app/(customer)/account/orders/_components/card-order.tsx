"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format-currency";
import { formatDate, timeAgo } from "@/lib/format-date";
import { OrderItemAdmin } from "@/types/api";
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
  paymentStatus?: string;
  address: string;
  orderItems: OrderItemAdmin[];
  total_price: number;
};

export const getEffectiveOrderStatus = (
  orderStatus?: string,
  paymentStatus?: string
) => {
  const pStatus = paymentStatus?.toLowerCase();
  const oStatus = orderStatus?.toLowerCase();

  // 1. Prioritas utama: jika pembayaran gagal / kadaluarsa atau order dibatalkan -> cancelled
  if (
    oStatus === "cancelled" ||
    pStatus === "failed" ||
    pStatus === "expired"
  ) {
    return "cancelled";
  }

  // 2. Status pengiriman
  if (oStatus === "shipped") return "shipped";
  if (oStatus === "delivered") return "delivered";

  // 3. Status lunas
  if (oStatus === "paid" || pStatus === "success") {
    return "paid";
  }

  // 4. Default: pending
  return "pending";
};

const renderStatusBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return (
        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-xs font-semibold">
          Menunggu Pembayaran
        </Badge>
      );
    case "paid":
      return (
        <Badge className="bg-green-500/10 text-green-700 border-green-500/20 text-xs font-semibold">
          Diproses / Lunas
        </Badge>
      );
    case "shipped":
      return (
        <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/20 text-xs font-semibold">
          Sedang Dikirim
        </Badge>
      );
    case "delivered":
      return (
        <Badge className="bg-foreground/10 text-foreground border-foreground/20 text-xs font-semibold">
          Selesai
        </Badge>
      );
    case "cancelled":
      return (
        <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs font-semibold">
          Dibatalkan / Gagal
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-xs">
          {status}
        </Badge>
      );
  }
};

export const CardOrder = (props: CardOrderProps) => {
  const {
    orderId,
    createdAt,
    status,
    paymentStatus,
    address,
    orderItems,
    total_price,
  } = props;
  const { push } = useRouter();

  const effectiveStatus = getEffectiveOrderStatus(status, paymentStatus);
  const isPending = effectiveStatus === "pending";
  const isShipped = effectiveStatus === "shipped";
  const isDelivered = effectiveStatus === "delivered";

  return (
    <div className="border rounded-xl shadow-xs w-full overflow-hidden bg-card">
      <div className="p-3 md:p-4">
        {/* Header Order */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
          <div className="flex items-center gap-2">
            <TbShoppingBag className="text-xl text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Nomor Pesanan</p>
              <p className="text-sm font-bold font-mono text-foreground">
                #ORD-{orderId}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {renderStatusBadge(effectiveStatus)}
            <Badge variant="outline" className="text-xs text-muted-foreground">
              {timeAgo(createdAt)}
            </Badge>
          </div>
        </div>

        {/* Info Rute Pengiriman */}
        {address && address !== "-" && (
          <div className="hidden md:flex p-2.5 bg-muted/40 rounded-lg flex-row justify-between items-center mb-3">
            <Badge variant="outline" className="bg-background">
              <Truck size={14} className="mr-1.5" />
              <span>Gudang Idshopcase</span>
            </Badge>
            <ArrowCustom />
            <Badge variant="outline" className="bg-background">
              <MapPin size={14} className="mr-1.5" />
              <span className="text-xs">{address}</span>
            </Badge>
          </div>
        )}

        {/* Item Produk */}
        <div className="flex flex-col gap-2">
          {orderItems?.map((item) => (
            <div
              key={item.id}
              className="h-20 w-full border rounded-lg overflow-hidden flex flex-row gap-3 p-1.5 bg-background"
            >
              <div className="h-full w-16 relative rounded-md overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={imageUrlPrimary(item.Product?.ProductImages) ?? ""}
                  alt={item.Product?.name || "product"}
                  fill
                  className="object-center object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <p className="text-xs md:text-sm font-semibold text-foreground truncate">
                  {item.Product?.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  {item.Variant && <span>Varian: {item.Variant.name}</span>}
                  {item.PhoneType && <span>• {item.PhoneType.model}</span>}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-semibold text-foreground">
                    {formatCurrency(Number(item.price || item.Variant?.price || 0))}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    x{item.quantity || 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Total & Aksi */}
      <div className="w-full py-3.5 px-4 bg-muted/30 border-t flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground text-xs md:text-sm">Total Tagihan:</span>
          <span className="text-foreground font-bold text-sm md:text-base">
            {formatCurrency(total_price)}
          </span>
          <span className="text-muted-foreground text-xs">
            ({orderItems?.length || 0} item)
          </span>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => push(`/account/orders/detail/${orderId}`)}
          >
            Detail
          </Button>

          {isPending && (
            <Button
              type="button"
              variant="default"
              size="sm"
              className="text-xs font-semibold"
              onClick={() => push(`/order/${orderId}/payment`)}
            >
              Bayar Sekarang
            </Button>
          )}

          {(isShipped || isDelivered) && (
            <Button
              type="button"
              variant="default"
              size="sm"
              className="text-xs font-semibold"
              onClick={() => push(`/account/track-order?order_id=${orderId}`)}
            >
              Lacak Pengiriman
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
