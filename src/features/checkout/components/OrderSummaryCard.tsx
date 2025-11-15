// features/checkout/components/OrderSummaryCard.tsx
"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format-currency";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  material?: string;
  phoneType?: string;
};

type OrderSummaryCardProps = {
  product: Product;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export const OrderSummaryCard = ({
  product,
  quantity,
  onIncrease,
  onDecrease,
}: OrderSummaryCardProps) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Ringkasan Pesanan</h3>
      </CardHeader>
      <CardContent className="flex flex-row gap-4 items-center">
        <div className="relative w-24 h-24 flex-shrink-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        <div className="flex-1">
          <p className="font-semibold">{product.name}</p>
          {product.phoneType && (
            <p className="text-sm text-foreground/60">{product.phoneType}</p>
          )}
          {product.material && (
            <p className="text-sm text-foreground/60">{product.material}</p>
          )}
          <p className="font-bold mt-2">{formatCurrency(product.price)}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onDecrease}>
            -
          </Button>
          <span className="px-4">{quantity}</span>
          <Button variant="outline" onClick={onIncrease}>
            +
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
