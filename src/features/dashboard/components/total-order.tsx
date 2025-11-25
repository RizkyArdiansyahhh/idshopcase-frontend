"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useGetOrdersAdmin } from "@/features/orders/api/get-orders-admin";
import { IconPackage } from "@tabler/icons-react";

export const TotalOrderCard = () => {
  const { data: orders } = useGetOrdersAdmin();

  if (!orders) return null;

  const totalOrders = orders.length;

  const monthlyOrders: Record<string, number> = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    if (!monthlyOrders[monthKey]) monthlyOrders[monthKey] = 0;
    monthlyOrders[monthKey] += 1;
  });

  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;

  const ordersThisMonth = monthlyOrders[currentMonthKey] ?? 0;

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Total Order</CardDescription>
        <CardAction>
          <Badge variant="outline">
            <IconPackage />+{ordersThisMonth} bulan ini
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
        {totalOrders}
      </CardContent>

      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Order baru bulan ini <IconPackage className="size-4" />
        </div>
        <div className="text-muted-foreground">
          Total seluruh pesanan yang masuk
        </div>
      </CardFooter>
    </Card>
  );
};
