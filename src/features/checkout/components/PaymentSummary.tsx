"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format-currency";
import { useGetSummaryOrder } from "../api/get-summary-order";
import { useEffect, useMemo } from "react";
import { AlertMessage } from "@/components/shared/alert-message";
import { CheckoutButton } from "@/app/(customer)/order/components/CheckoutButton";

type PaymentSummaryProps = {
  paymentMethod: string;
  createOrderIsLoading: boolean;
  handleCreateOrder: () => void;
  addressId?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataRequest?: any; // buyNow atau selectedItemIds
  isAllImageValid?: boolean;
};

export const PaymentSummary = ({
  paymentMethod,
  createOrderIsLoading,
  handleCreateOrder,
  dataRequest = {},
  addressId,
  isAllImageValid,
}: PaymentSummaryProps) => {
  const { mutate, data: summary, isPending } = useGetSummaryOrder({});

  // Build payload untuk summary secara memo agar tidak rekalkulasi terus
  const requestPayload = useMemo(() => {
    if (!addressId) return null; // belum ada alamat
    return {
      ...dataRequest,
      addressId,
    };
  }, [dataRequest, addressId]);

  console.log(requestPayload, "ini dataaanya");

  // Tentukan info message
  const infoMessage = useMemo(() => {
    if (!requestPayload) {
      return "Silakan Lengkapi Data Pesanan";
    }
    const hasProduct =
      requestPayload.buyNow ||
      (requestPayload.selectedItemIds?.length ?? 0) > 0;

    if (!requestPayload.addressId && !hasProduct) {
      return "Silakan Lengkapi Alamat Pengiriman dan Pilih Produk Pesanan";
    }
    if (!requestPayload.addressId) {
      return "Silakan Lengkapi Alamat Pengiriman";
    }
    if (!hasProduct) {
      return "Silakan Pilih Produk Pesanan";
    }
    if (!isAllImageValid) {
      return "Silakan Unggah Gambar Produk";
    }
    return "";
  }, [requestPayload, isAllImageValid]);

  // Trigger fetch summary ketika requestPayload valid
  useEffect(() => {
    if (!requestPayload) return;
    if (
      requestPayload.buyNow ||
      (requestPayload.selectedItemIds?.length ?? 0) > 0
    ) {
      mutate(requestPayload);
    }
  }, [requestPayload, mutate]);

  const isCheckoutEnabled = useMemo(() => {
    const hasProduct =
      requestPayload?.buyNow ||
      (requestPayload?.selectedItemIds?.length ?? 0) > 0;

    return !!requestPayload?.addressId && hasProduct && isAllImageValid;
  }, [requestPayload, isAllImageValid]);

  return (
    <div>
      <Card className="rounded-md">
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold">
            Metode Pembayaran
          </h3>
          <p className="text-xs text-foreground/70">{paymentMethod}</p>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-2 text-xs md:text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {isPending ? "-" : formatCurrency(summary?.subtotal ?? 0)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Pengiriman</span>
              <span>
                {isPending ? "-" : formatCurrency(summary?.shipping?.cost ?? 0)}
              </span>
            </div>

            <div className="border-t-2 border-dashed border-foreground/30 my-2" />

            <div className="flex justify-between font-bold text-sm md:text-base lg:text-lg">
              <span>Total Pembayaran</span>
              <span>
                {isPending ? "-" : formatCurrency(summary?.total ?? 0)}
              </span>
            </div>

            {infoMessage && (
              <AlertMessage variant="info" message={infoMessage} />
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-4">
        <CheckoutButton
          isLoading={createOrderIsLoading}
          onCreateOrder={handleCreateOrder}
          enabled={isCheckoutEnabled}
        />
      </div>
    </div>
  );
};
