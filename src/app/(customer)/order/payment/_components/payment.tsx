"use client";

import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const Payment = () => {
  const router = useRouter();

  const goToOrders = useCallback(() => {
    // pakai push agar navigasi selalu jalan
    router.push("/account/orders");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full h-full">
      <DotLottieReact
        src="https://lottie.host/1d8b4ddc-5c71-4b00-b443-e3f312a5fda4/yILCKzQLVz.lottie"
        loop
        autoplay
        style={{ width: 200, height: 200 }}
      />
      <div className="flex flex-col gap-3 items-center text-center px-4">
        <h1 className="text-2xl font-semibold text-primary">Pembayaran</h1>
        <p className="text-md font-light text-muted-foreground">
          Silakan lakukan pembayaran. Jika sudah dibayar, klik tombol di bawah
          untuk melihat detail pesanan Anda.
        </p>
        <Button variant="default" className="w-full" onClick={goToOrders}>
          Lihat Pesanan
        </Button>
      </div>
    </div>
  );
};
