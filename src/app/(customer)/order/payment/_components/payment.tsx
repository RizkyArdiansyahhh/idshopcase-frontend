"use client";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";

export const Payment = () => {
  const { replace } = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full h-full ">
      <DotLottieReact
        src="https://lottie.host/1d8b4ddc-5c71-4b00-b443-e3f312a5fda4/yILCKzQLVz.lottie"
        loop
        autoplay
        style={{ width: 200, height: 200 }}
      />
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-2xl font-semibold text-primary">Pembayaran</h1>
        <p className="text-md font-light text-muted-foreground">
          Silahkan Lakukan Pembayaran, jika sudah dibayar silahkan Lanjut ke
          detail Pesanan
        </p>
        <Button
          variant={"default"}
          className="w-full"
          type="button"
          onClick={() => replace("/account/orders")}
        >
          Lihat Pesanan
        </Button>
      </div>
    </div>
  );
};
