"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format-currency";
import { formatDate, timeAgo } from "@/lib/format-date";
import { OrderItemAdmin } from "@/types/api";
import { imageUrlPrimary } from "@/utils/image-utils";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TbShoppingBag } from "react-icons/tb";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("account.orders");

  const effectiveStatus = getEffectiveOrderStatus(status, paymentStatus);
  const isPending = effectiveStatus === "pending";
  const isShipped = effectiveStatus === "shipped";
  const isDelivered = effectiveStatus === "delivered";

  const renderStatusBadge = (s: string) => {
    switch (s?.toLowerCase()) {
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-xs font-semibold">
            {t("filter.pending")}
          </Badge>
        );
      case "paid":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 text-xs font-semibold">
            {t("filter.paid")}
          </Badge>
        );
      case "shipped":
        return (
          <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 text-xs font-semibold">
            {t("filter.shipped")}
          </Badge>
        );
      case "delivered":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs font-semibold">
            {t("filter.delivered")}
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/20 text-xs font-semibold">
            {t("filter.cancelled")}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {s}
          </Badge>
        );
    }
  };

  return (
    <div className="w-full border border-neutral-200 rounded-none bg-white font-sans text-neutral-900 shadow-2xs overflow-hidden">
      {/* Header Info */}
      <div className="w-full py-3.5 px-4 bg-neutral-50/60 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 font-bold text-neutral-900">
            <TbShoppingBag className="text-sm" />
            <span>Belanja</span>
          </span>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-500 font-mono text-[11px]">
            {formatDate(createdAt)}
          </span>
          <span className="text-neutral-400 text-[10px]">
            ({timeAgo(createdAt)})
          </span>
          <span className="text-neutral-400">•</span>
          <span className="font-mono text-neutral-600 text-xs">
            #{orderId}
          </span>
        </div>

        <div>{renderStatusBadge(effectiveStatus)}</div>
      </div>

      {/* Konten Card */}
      <div className="p-4 flex flex-col gap-3">
        {address && address !== "-" && (
          <div className="flex items-center text-xs text-neutral-500">
            <MapPin size={13} className="mr-1.5 text-neutral-400 shrink-0" />
            <span className="truncate">{address}</span>
          </div>
        )}

        {/* Item Produk */}
        <div className="flex flex-col gap-2">
          {orderItems?.map((item) => (
            <div
              key={item.id}
              className="w-full border border-neutral-100 rounded-none flex flex-row gap-3 p-2 bg-neutral-50/30"
            >
              <div className="h-16 w-16 relative rounded-none overflow-hidden bg-neutral-100 shrink-0">
                <Image
                  src={imageUrlPrimary(item.Product?.ProductImages) ?? ""}
                  alt={item.Product?.name || "product"}
                  fill
                  className="object-center object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <p className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
                  {item.Product?.name}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                  {item.Variant && <span>{t("variant")}: {item.Variant.name}</span>}
                  {item.PhoneType && <span>• {item.PhoneType.model}</span>}
                </div>
                <div className="flex items-center justify-between mt-1 text-xs">
                  <span className="font-bold text-neutral-900">
                    {formatCurrency(Number(item.price || item.Variant?.price || 0))}
                  </span>
                  <span className="text-neutral-500 font-mono">
                    x{item.quantity || 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Total & Aksi */}
      <div className="w-full py-3 px-4 bg-white border-t border-neutral-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex items-baseline gap-1.5 text-xs">
          <span className="text-neutral-500">{t("totalBill")}:</span>
          <span className="text-neutral-900 font-bold text-sm">
            {formatCurrency(total_price)}
          </span>
          <span className="text-neutral-400 text-[11px]">
            ({orderItems?.length || 0} {t("items")})
          </span>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs rounded-none border-neutral-300 hover:border-black"
            onClick={() => push(`/account/orders/detail/${orderId}`)}
          >
            {t("detail")}
          </Button>

          {isPending && (
            <Button
              type="button"
              size="sm"
              className="text-xs font-bold bg-black hover:bg-neutral-800 text-white rounded-none"
              onClick={() => push(`/order/${orderId}/payment`)}
            >
              {t("payNow")}
            </Button>
          )}

          {(isShipped || isDelivered) && (
            <Button
              type="button"
              size="sm"
              className="text-xs font-bold bg-black hover:bg-neutral-800 text-white rounded-none"
              onClick={() => push(`/account/track-order?order_id=${orderId}`)}
            >
              {t("trackShipment")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
