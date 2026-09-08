"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format-currency";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Order, OrderItem, User } from "@/types/api";
import { CardProductDetail } from "../detail/[orderId]/_components/card-product-detail";
import { imageUrlPrimary } from "@/utils/image-utils";
import { formatDate } from "@/lib/format-date";
import { ButtonCopyResi } from "@/components/shared/button-copy-resi";
import { WhatsAppSupport } from "../detail/[orderId]/_components/whatsapp-support";
import { WaitingPayment } from "../detail/[orderId]/_components/waiting-payment";
import { useTranslations } from "next-intl";

export default function OrderDetail({
  order,
  user,
}: {
  order: Order;
  user: User;
}) {
  const t = useTranslations("account.orders.orderDetail");

  if (!order) return <p className="text-xs text-foreground/50 py-6">Loading...</p>;

  const orderItems = order.OrderItems || [];
  const address = order.Address;
  const totalPriceBeforeShipping = orderItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );
  const shipping = Number(order.total_price) - totalPriceBeforeShipping;
  const showWaitingPayment =
    order.status === "pending" &&
    order.Payment?.payment_url &&
    order.Payment?.expired_at;

  return (
    <div className="w-full space-y-3.5 pb-8">
      {/* 1. Navigasi Kembali */}
      <div>
        <Link
          href="/account/orders"
          className="inline-flex items-center text-foreground/60 text-xs font-medium gap-1.5 hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          <span>{t("back")}</span>
        </Link>
      </div>

      {/* 2. Banner Menunggu Pembayaran (jika pending) */}
      {showWaitingPayment && (
        <WaitingPayment
          paymentUrl={order.Payment.payment_url}
          expiredAt={order.Payment.expired_at}
        />
      )}

      {/* 3. Header Ringkas Informasi Pesanan (Full-Width) */}
      <div className="border shadow-xs rounded-md p-3 sm:p-4 bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] text-foreground/50 font-medium">
            {t("orderId")}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs sm:text-sm font-semibold text-foreground select-all break-all">
              #{order.id}
            </span>
            <div className="shrink-0">
              {ButtonCopyResi(String(order.id))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/70 sm:text-right">
          <div>
            <span className="text-foreground/50 text-[11px] block sm:inline sm:mr-1">
              {t("createdAt")}:
            </span>
            <span className="font-medium text-foreground">
              {formatDate(order.createdAt)}
            </span>
          </div>
          {order.Payment?.status === "success" && (
            <div>
              <span className="text-foreground/50 text-[11px] block sm:inline sm:mr-1">
                {t("paidAt")}:
              </span>
              <span className="font-medium text-foreground">
                {formatDate(order.Payment.updatedAt)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 4. Daftar Produk (Full-Width, Lega) */}
      <div className="border shadow-xs rounded-md p-3 sm:p-4 bg-background space-y-2.5">
        <div className="flex items-center justify-between pb-1 border-b border-foreground/5">
          <p className="font-semibold text-foreground text-xs sm:text-sm">
            {t("products")}
          </p>
          <span className="text-xs text-foreground/50">
            {t("subtotal", { count: orderItems.length })}
          </span>
        </div>

        <div className="space-y-2">
          {orderItems.map((item: OrderItem) => (
            <CardProductDetail
              key={item.id}
              imageUrl={imageUrlPrimary(item.Product.ProductImages) ?? ""}
              productName={item.Product.name}
              price={item.Variant?.price ?? item.price}
              quantity={item.quantity}
              variant={item.Variant?.name}
              phoneType={item.PhoneType?.model}
              totalPrice={item.price}
            />
          ))}
        </div>
      </div>

      {/* 5. Dua Kolom Berdampingan yang Seimbang: Pengiriman & Alamat Penerima */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
        {/* Kolom 1: Pengiriman & Resi */}
        <div className="border shadow-xs rounded-md p-3 sm:p-4 bg-background space-y-3 h-full">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-foreground text-xs sm:text-sm">
              {t("shipping")}
            </p>
            {order.tracking_number && (
              <Link
                href={`/account/track-order?order_id=${order.id}`}
                className="text-xs font-semibold text-foreground hover:underline inline-flex items-center gap-1"
              >
                <span>{t("trackShipment")}</span>
                &rarr;
              </Link>
            )}
          </div>

          <div className="flex flex-row gap-2.5 items-center">
            <div className="h-11 w-11 border border-foreground/10 relative rounded-md overflow-hidden shrink-0">
              <Image
                src={"/images/logo-jnt.jpg"}
                alt="J&T Express"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="flex-1 flex flex-row justify-between items-center min-w-0">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                  J&T Express
                </p>
                <p className="text-[11px] text-foreground/50">{t("courier")}</p>
              </div>
              <span className="font-semibold text-xs sm:text-sm text-foreground shrink-0">
                {formatCurrency(shipping)}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-foreground/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
            <span className="text-[11px] text-foreground/50 shrink-0">
              {t("trackingNumber")} :
            </span>
            {order.tracking_number ? (
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-semibold text-foreground text-xs">
                  {order.tracking_number}
                </span>
                {ButtonCopyResi(order.tracking_number)}
              </div>
            ) : (
              <span className="text-[11px] text-foreground/50 italic">
                {t("noResi")}
              </span>
            )}
          </div>
        </div>

        {/* Kolom 2: Alamat Pengiriman & Kontak */}
        {address && (
          <div className="border rounded-md p-3 sm:p-4 space-y-2.5 bg-background h-full">
            <p className="font-semibold text-foreground text-xs sm:text-sm">
              {t("customerDetails")}
            </p>

            <div className="text-xs space-y-1">
              <p className="font-semibold text-foreground">
                {address.recipient_name}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-foreground/60">
                {(address.phone || user?.phone) && (
                  <div className="flex items-center gap-1">
                    <Phone size={13} className="text-foreground/40 shrink-0" />
                    <span>{address.phone || user?.phone}</span>
                  </div>
                )}
                {user?.email && (
                  <div className="flex items-center gap-1">
                    <Mail size={13} className="text-foreground/40 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-foreground/50 uppercase tracking-wider">
                {t("shippingAddress")}
              </p>
              <p className="text-xs text-foreground/70 leading-relaxed">
                {[
                  address.details,
                  address.district,
                  address.city,
                  address.province,
                  address.postal_code,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 6. Dua Kolom Berdampingan: Bantuan & Ringkasan Pembayaran */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
        {/* Kolom 1: Bantuan */}
        <div className="border shadow-xs rounded-md p-3 sm:p-4 flex flex-col gap-2 bg-background h-full justify-between">
          <p className="font-semibold text-foreground text-xs sm:text-sm">
            {t("needHelp")}
          </p>
          <WhatsAppSupport
            orderId={order.id}
            username={address?.recipient_name || user?.name || ""}
            date={order.createdAt}
          />
        </div>

        {/* Kolom 2: Ringkasan Pembayaran */}
        <div className="border shadow-xs rounded-md flex flex-col bg-background h-full justify-between">
          <div className="p-3 sm:p-4 space-y-2">
            <p className="font-semibold text-foreground text-xs sm:text-sm">
              {t("paymentSummary")}
            </p>

            <div className="flex flex-row justify-between items-center text-xs">
              <span className="text-foreground/60">
                {t("subtotal", { count: orderItems.length })}
              </span>
              <span className="font-medium text-foreground">
                {formatCurrency(totalPriceBeforeShipping)}
              </span>
            </div>
            <div className="flex flex-row justify-between items-center text-xs">
              <span className="text-foreground/60">{t("shippingCost")}</span>
              <span className="font-medium text-foreground">
                {formatCurrency(shipping)}
              </span>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center bg-foreground/5 px-3 sm:px-4 py-2.5 border-t border-foreground/5">
            <span className="text-xs sm:text-sm font-bold text-foreground">
              {t("totalPayment")}
            </span>
            <span className="font-bold text-xs sm:text-sm text-foreground">
              {formatCurrency(Number(order.total_price))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
