"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetOrders } from "@/features/orders/api/get-orders";
import { formatCurrency } from "@/lib/format-currency";
import { Order } from "@/types/api";
import { IconTrendingUp } from "@tabler/icons-react";

export const TotalRevenue = () => {
  const { data: orders } = useGetOrders();

  if (!orders) return null;

  const getMonthlyRevenue = (orders: Order[]) => {
    const completedOrders = orders.filter(
      (order) => order.status === "completed"
    );

    const monthlyRevenue: Record<string, number> = {};

    completedOrders.forEach((order) => {
      const date = new Date(order.createdAt);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      if (!monthlyRevenue[monthKey]) monthlyRevenue[monthKey] = 0;
      monthlyRevenue[monthKey] += order.total_price;
    });

    return monthlyRevenue;
  };

  const monthlyRevenue = getMonthlyRevenue(orders);

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;

  const revenueThisMonth = monthlyRevenue[currentMonth] || 0;

  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardDescription>Pendapatan</CardDescription>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </div>
      </CardHeader>
      <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
        {formatCurrency(revenueThisMonth)}
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Tren naik bulan ini <IconTrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">Total pendapatan bulan ini</div>
      </CardFooter>
    </Card>
  );
};
