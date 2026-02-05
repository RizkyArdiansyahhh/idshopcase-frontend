"use client";

import Countdown from "react-countdown";
import { AlertMessage } from "@/components/shared/alert-message";
import { Button } from "@/components/ui/button";

type WaitingPaymentProps = {
  paymentUrl: string;
  expiredAt: string;
};

export const WaitingPayment = ({
  paymentUrl,
  expiredAt,
}: WaitingPaymentProps) => {
  return (
    <div className="w-full pb-2 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
      <div className="w-full flex flex-row justify-between">
        <AlertMessage
          variant="info"
          message="Silahkan lakukan pembayaran"
          clasname="text-xs"
        />

        <div className="flex items-center gap-3">
          <Countdown
            date={new Date(expiredAt)}
            renderer={({ hours, minutes, seconds, completed }) => {
              if (completed) {
                return (
                  <span className="text-xs text-destructive">
                    Waktu pembayaran habis
                  </span>
                );
              }

              return (
                <div className="px-3  py-2 border border-dashed rounded-md text-sm font-mono">
                  {String(hours).padStart(2, "0")}:
                  {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
                </div>
              );
            }}
            onComplete={() => {
              console.log("Payment expired");
              // router.refresh()
              // setDisabled(true)
            }}
          />

          <Button
            className="text-xs hidden md:block"
            onClick={() => window.open(paymentUrl, "_blank")}
          >
            Bayar Sekarang
          </Button>
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <Button
          className="text-xs block md:hidden"
          onClick={() => window.open(paymentUrl, "_blank")}
        >
          Bayar Sekarang
        </Button>
      </div>
    </div>
  );
};
