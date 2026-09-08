"use client";

import Countdown from "react-countdown";
import { AlertMessage } from "@/components/shared/alert-message";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type WaitingPaymentProps = {
  paymentUrl: string;
  expiredAt: string;
};

export const WaitingPayment = ({
  paymentUrl,
  expiredAt,
}: WaitingPaymentProps) => {
  const t = useTranslations("account.orders.orderDetail");

  return (
    <div className="w-full pb-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <AlertMessage
          variant="info"
          message={t("paymentWaiting")}
          clasname="text-xs"
        />

        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <Countdown
            date={new Date(expiredAt)}
            renderer={({ hours, minutes, seconds, completed }) => {
              if (completed) {
                return (
                  <span className="text-xs text-destructive font-medium">
                    {t("paymentExpired")}
                  </span>
                );
              }

              return (
                <div className="px-3 py-1.5 border border-dashed rounded-md text-sm font-mono">
                  {String(hours).padStart(2, "0")}:
                  {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
                </div>
              );
            }}
          />

          <Button
            size="sm"
            className="text-xs"
            onClick={() => window.open(paymentUrl, "_blank")}
          >
            {t("payNow")}
          </Button>
        </div>
      </div>
    </div>
  );
};
