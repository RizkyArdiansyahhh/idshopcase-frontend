// features/checkout/components/PaymentSummary.tsx
"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format-currency";

type PaymentSummaryProps = {
  paymentMethod: string;
  subtotal: number;
  shippingCost: number;
};

export const PaymentSummary = ({
  paymentMethod,
  subtotal,
  shippingCost,
}: PaymentSummaryProps) => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Metode Pembayaran</h3>
        <p className="text-sm text-foreground/70">{paymentMethod}</p>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Pengiriman:</span>
            <span>{formatCurrency(shippingCost)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total Pembayaran:</span>
            <span>{formatCurrency(subtotal + shippingCost)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter />
    </Card>
  );
};
