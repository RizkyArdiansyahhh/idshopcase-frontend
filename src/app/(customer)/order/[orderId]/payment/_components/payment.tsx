"use client";

import { Button } from "@/components/ui/button";
import { useGetOrder } from "@/features/orders/api/get-order";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const Payment = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const router = useRouter();
  const [isManualChecking, setIsManualChecking] = useState(false);

  const {
    data: order,
    isLoading,
    isFetching,
    refetch,
  } = useGetOrder({
    id: Number(orderId),
    queryConfig: {
      refetchInterval: (query) => {
        const status = query.state.data?.Payment?.status;
        return status === "pending" ? 5000 : false;
      },
    },
  });

  const paymentUrl = order?.Payment?.payment_url;
  const paymentStatus = order?.Payment?.status;

  // 1. Redirect jika status order sudah bukan pending
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

  // 4. Tombol Fallback Manual Check
  const checkPaymentStatus = useCallback(async () => {
    setIsManualChecking(true);
    try {
      const res = await refetch();
      const currentStatus = res.data?.Payment?.status;

      if (currentStatus && currentStatus !== "pending") {
        toast.success("Pembayaran berhasil terverifikasi!");
        router.replace(`/order/${orderId}/status`);
      } else {
        toast.info("Pembayaran masih dalam proses atau belum terverifikasi.");
      }
    } catch {
      toast.error("Gagal memeriksa status pembayaran. Silakan coba beberapa saat lagi.");
    } finally {
      setIsManualChecking(false);
    }
  }, [refetch, orderId, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full h-full py-8">
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
          Pembayaran akan dibuka di tab baru. Setelah selesai, status akan
          diperiksa secara otomatis atau Anda dapat mengeklik
          <span className="font-medium"> “Periksa Status Pembayaran”</span>.
        </p>

        <div className="flex flex-col gap-2 w-full mt-2">
          <Button onClick={goToPayment} disabled={!paymentUrl || isLoading}>
            Lakukan Pembayaran
          </Button>

          <Button
            variant="outline"
            className="border-dashed border-foreground"
            onClick={checkPaymentStatus}
            disabled={isManualChecking || isFetching}
          >
            {isManualChecking || isFetching
              ? "Memeriksa..."
              : "Periksa Status Pembayaran"}
          </Button>
        </div>
      </div>
    </div>
  );
};
