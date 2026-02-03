"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export const Payment = () => {
  const router = useRouter();

  // Mock data
  const orderData = useMemo(
    () => ({
      orderId: "ORD123456",
      status: "success", // success | failed
      paymentMethod: "DOKU Checkout",
      total: 119200,
      date: "2026-02-03 14:35",
      items: [
        { id: 1, name: "Produk A", qty: 1, price: 50000 },
        { id: 2, name: "Produk B", qty: 2, price: 34600 },
      ],
    }),
    [],
  );

  const formatCurrency = (value: number) =>
    `Rp ${value.toLocaleString("id-ID")}`;

  const handleBackToOrders = () => {
    router.push("/account/orders");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col items-center">
          <h1
            className={`text-2xl font-bold ${orderData.status === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {orderData.status === "success"
              ? "Pembayaran Berhasil"
              : "Pembayaran Gagal"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Order ID: {orderData.orderId}
          </p>
        </div>

        {/* Order info */}
        <div className="flex flex-col gap-2 border-t border-b py-2">
          <div className="flex justify-between">
            <span>Tanggal</span>
            <span className="font-medium">{orderData.date}</span>
          </div>
          <div className="flex justify-between">
            <span>Metode Pembayaran</span>
            <span className="font-medium">{orderData.paymentMethod}</span>
          </div>
        </div>

        {/* Item list */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Rincian Pesanan</h2>
          {orderData.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.name} x{item.qty}
              </span>
              <span>{formatCurrency(item.price * item.qty)}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between mt-2 border-t pt-2 font-bold text-lg">
          <span>Total</span>
          <span>{formatCurrency(orderData.total)}</span>
        </div>

        {/* Button */}
        <Button
          variant="default"
          className="w-full mt-4"
          onClick={handleBackToOrders}
        >
          Kembali ke Pesanan
        </Button>
      </div>
    </div>
  );
};
