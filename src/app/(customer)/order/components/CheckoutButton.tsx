// features/checkout/components/CheckoutButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type CheckoutButtonProps = {
  onCreateOrder: () => Promise<void> | void;
  isLoading: boolean;
};

export const CheckoutButton = ({
  onCreateOrder,
  isLoading,
}: CheckoutButtonProps) => {
  return (
    <div className="w-full">
      <Button
        onClick={onCreateOrder}
        className="w-full py-3"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          "Buat Pesanan"
        )}
      </Button>
    </div>
  );
};
