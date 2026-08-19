"use client";

import { Separator } from "@/components/ui/separator";
import { CircleCheckBig, CircleX, Clock, ArrowRight, ShoppingBag, RotateCcw } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetOrder } from "@/features/orders/api/get-order";
import { formatCurrency } from "@/lib/format-currency";
import { formatDate } from "@/lib/format-date";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export const Status = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order, isLoading } = useGetOrder({
    id: orderId!,
    queryConfig: {
      staleTime: 0,
      refetchOnMount: "always",
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center w-full py-10 px-4 max-w-xl mx-auto">
        <Skeleton className="w-20 h-20 rounded-full mb-4" />
        <Skeleton className="w-64 h-8 mb-2" />
        <Skeleton className="w-80 h-5 mb-8" />
        <Skeleton className="w-full h-80 rounded-xl" />
      </div>
    );
  }

  const orderItems = order?.OrderItems || [];
  const subtotalProducts = orderItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
    0
  );
  const totalPrice = Number(order?.total_price || 0);
  const shippingCost = Math.max(0, totalPrice - subtotalProducts);

  const paymentStatus = order?.Payment?.status?.toLowerCase();
  const orderStatus = order?.status?.toLowerCase();

  const isFailed =
    orderStatus === "cancelled" ||
    paymentStatus === "failed" ||
    paymentStatus === "expired";

  const isSuccess =
    !isFailed &&
    (orderStatus === "paid" ||
      orderStatus === "shipped" ||
      orderStatus === "delivered" ||
      paymentStatus === "success");

  return (
    <div className="flex flex-col items-center w-full py-8 px-4">
      {/* Icon Status */}
      <div className="p-3 rounded-md bg-foreground text-background mb-4">
        {isSuccess ? (
          <CircleCheckBig size={56} />
        ) : isFailed ? (
          <CircleX size={56} />
        ) : (
          <Clock size={56} />
        )}
      </div>

      {/* Header Title */}
      <div className="mb-6 text-center max-w-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {isSuccess
            ? "Yeay! Pembayaran Berhasil"
            : isFailed
              ? "Pembayaran Tidak Berhasil"
              : "Menunggu Pembayaran"}
        </h1>
        <p className="text-muted-foreground text-sm md:text-base font-light mt-1">
          {isSuccess
            ? "Pesanan Anda telah berhasil dibayar dan akan segera diproses oleh tim kami."
            : isFailed
              ? "Waktu pembayaran telah habis atau transaksi dibatalkan. Anda dapat melakukan pemesanan ulang."
              : "Pembayaran Anda masih dalam proses verifikasi atau belum diselesaikan."}
        </p>
      </div>

      {/* Card Struk / Detail Pembayaran */}
      <div className="w-full max-w-xl bg-card border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <h3 className="text-base md:text-lg font-semibold text-foreground">
            Detail Pesanan
          </h3>
          <Separator className="my-3" />

          {/* Info Pesanan */}
          <div className="text-xs md:text-sm flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Nomor Pesanan:</span>
              <span className="font-semibold text-foreground font-mono">
                #ORD-{order?.id || orderId}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Tanggal Pesanan:</span>
              <span className="font-medium text-foreground">
                {order?.createdAt ? formatDate(order.createdAt) : "-"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Metode Pembayaran:</span>
              <span className="font-medium text-foreground">
                {order?.payment_method || "DOKU Checkout"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status:</span>
              {isSuccess ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-foreground/10 text-foreground">
                  Lunas
                </span>
              ) : isFailed ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-destructive/10 text-destructive">
                  Gagal / Dibatalkan
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-500/10 text-amber-600">
                  Menunggu Pembayaran
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Ticket Divider Deco */}
        <div className="flex justify-between items-center relative my-1">
          <div className="w-5 h-8 rounded-r-full bg-background border-y border-r -ml-px" />
          <div className="border-t-2 flex-1 border-dashed border-border mx-2" />
          <div className="w-5 h-8 rounded-l-full bg-background border-y border-l -mr-px" />
        </div>

        {/* Breakdown Harga */}
        <div className="p-6 md:p-8 pt-4">
          <div className="flex flex-col gap-2.5 text-xs md:text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Harga Produk (Subtotal):</span>
              <span className="font-medium text-foreground">
                {formatCurrency(subtotalProducts)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Biaya Pengiriman (J&T):</span>
              <span className="font-medium text-foreground">
                {formatCurrency(shippingCost)}
              </span>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-between items-center text-sm md:text-base font-bold">
              <span className="text-foreground">Total Tagihan:</span>
              <span className="text-primary text-base md:text-lg">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            {isSuccess ? (
              <>
                <Link
                  href={`/account/orders/detail/${order?.id || orderId}`}
                  className="flex-1"
                >
                  <Button className="w-full font-semibold gap-2">
                    Lihat Detail Pesanan
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href="/products/collections" className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    <ShoppingBag size={16} />
                    Belanja Lagi
                  </Button>
                </Link>
              </>
            ) : isFailed ? (
              <>
                <Link href="/products/collections" className="flex-1">
                  <Button className="w-full font-semibold gap-2">
                    <RotateCcw size={16} />
                    Pesan Ulang Produk
                  </Button>
                </Link>
                <Link href="/account/orders" className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    Riwayat Pesanan
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href={`/order/${order?.id || orderId}/payment`} className="flex-1">
                  <Button className="w-full font-semibold gap-2">
                    Lanjutkan Pembayaran
                  </Button>
                </Link>
                <Link href="/account/orders" className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    Riwayat Pesanan
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
