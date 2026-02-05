"use client";

import { Button } from "@/components/ui/button";
import { useGetOrder } from "@/features/orders/api/get-order";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export const Payment = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const router = useRouter();

  const {
    data: order,
    isLoading,
    isFetching,
    refetch,
  } = useGetOrder({
    id: Number(orderId),
  });

  const paymentUrl = order?.Payment?.payment_url;
  const paymentStatus = order?.Payment?.status;
  useEffect(() => {
    if (!paymentStatus) return;

    if (paymentStatus !== "pending") {
      router.replace(`/order/${orderId}/status`);
    }
  }, [paymentStatus, orderId, router]);

  const goToPayment = useCallback(() => {
    if (!paymentUrl) return;

    window.open(paymentUrl, "_blank", "noopener,noreferrer");
  }, [paymentUrl]);

  const checkPaymentStatus = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full h-full">
      <DotLottieReact
        src="https://lottie.host/1d8b4ddc-5c71-4b00-b443-e3f312a5fda4/yILCKzQLVz.lottie"
        loop
        autoplay
        style={{ width: 200, height: 200 }}
      />

      <div className="flex flex-col gap-3 items-center text-center px-4 max-w-md">
        <h1 className="text-2xl font-semibold text-primary">
          Menunggu Pembayaran
        </h1>

        <p className="text-md font-light text-muted-foreground">
          Pembayaran akan dibuka di tab baru. Setelah selesai, kembali ke
          halaman ini lalu klik
          <span className="font-medium"> “Periksa Status Pembayaran”</span>.
        </p>

        <div className="flex flex-col gap-2 w-full">
          <Button onClick={goToPayment} disabled={!paymentUrl || isLoading}>
            Lakukan Pembayaran
          </Button>

          <Button
            variant="outline"
            className="border-dashed border-foreground"
            onClick={checkPaymentStatus}
            disabled={isFetching}
          >
            {isFetching ? "Memeriksa..." : "Periksa Status Pembayaran"}
          </Button>
        </div>
      </div>
    </div>
  );
};
