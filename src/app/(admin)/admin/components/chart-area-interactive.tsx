"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useGetOrdersAdmin } from "@/features/orders/api/get-orders-admin";
import { formatCurrency } from "@/lib/format-currency";
import { SpinnerV2 } from "@/components/ui/spinner";
import { IconChartAreaLine, IconReceipt } from "@tabler/icons-react";

const chartConfig = {
  orders: {
    label: "Pesanan Masuk",
    color: "var(--primary)",
  },
  revenue: {
    label: "Omset Penjualan",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartAreaOrders() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("30d");
  const [metric, setMetric] = React.useState<"orders" | "revenue">("orders");

  const { data: orders, isLoading } = useGetOrdersAdmin();

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;

  // Build dynamic time series from live orders in database
  const chartData = React.useMemo(() => {
    const now = new Date();
    const map: Record<string, { orders: number; revenue: number }> = {};

    (orders || []).forEach((order) => {
      if (order.createdAt) {
        const d = new Date(order.createdAt);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const key = `${y}-${m}-${day}`;

        if (!map[key]) {
          map[key] = { orders: 0, revenue: 0 };
        }
        map[key].orders += 1;
        // Include settled/active order values in revenue
        if (["shipped", "completed", "processing"].includes(order.status)) {
          map[key].revenue += Number(order.total_price) || 0;
        }
      }
    });

    const series: { date: string; orders: number; revenue: number }[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const key = `${y}-${m}-${day}`;

      series.push({
        date: key,
        orders: map[key]?.orders || 0,
        revenue: map[key]?.revenue || 0,
      });
    }

    return series;
  }, [orders, days]);

  const totals = React.useMemo(() => {
    let orderCount = 0;
    let rev = 0;
    chartData.forEach((d) => {
      orderCount += d.orders;
      rev += d.revenue;
    });
    return { orderCount, rev };
  }, [chartData]);

  const rangeLabel =
    timeRange === "7d"
      ? "7 hari terakhir"
      : timeRange === "30d"
      ? "30 hari terakhir"
      : "3 bulan terakhir";

  return (
    <Card className="border-border/60 bg-card min-w-0">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-4">
        <div>
          <CardTitle className="text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
            <IconChartAreaLine className="size-5 text-foreground shrink-0" />
            {metric === "orders" ? "Aktivitas Pesanan Harian" : "Tren Omset Penjualan"}
          </CardTitle>
          <CardDescription className="text-xs mt-0.5">
            {totals.orderCount} transaksi • {formatCurrency(totals.rev)} dalam {rangeLabel}
          </CardDescription>
        </div>

        <CardAction className="flex flex-wrap items-center gap-2">
          {/* Metric Toggle */}
          <ToggleGroup
            type="single"
            value={metric}
            onValueChange={(val) => {
              if (val) setMetric(val as "orders" | "revenue");
            }}
            variant="outline"
            className="hidden sm:inline-flex h-8"
          >
            <ToggleGroupItem value="orders" className="text-xs px-2.5 h-8">
              Pesanan
            </ToggleGroupItem>
            <ToggleGroupItem value="revenue" className="text-xs px-2.5 h-8">
              Omset (Rp)
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Time Range Toggle - Desktop */}
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(val) => {
              if (val) setTimeRange(val);
            }}
            variant="outline"
            className="hidden md:inline-flex h-8"
          >
            <ToggleGroupItem value="90d" className="text-xs px-2.5 h-8">
              3 Bulan
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="text-xs px-2.5 h-8">
              30 Hari
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="text-xs px-2.5 h-8">
              7 Hari
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Time Range Select - Mobile / Fallback */}
          <Select
            value={timeRange}
            onValueChange={(val) => setTimeRange(val)}
          >
            <SelectTrigger className="w-28 md:hidden h-8 text-xs" size="sm">
              <SelectValue placeholder="Periode" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="90d">3 Bulan</SelectItem>
              <SelectItem value="30d">30 Hari</SelectItem>
              <SelectItem value="7d">7 Hari</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 min-w-0">
        {isLoading ? (
          <div className="flex h-[260px] items-center justify-center">
            <SpinnerV2 className="size-8 text-foreground" />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[260px] w-full"
          >
            <AreaChart data={chartData} margin={{ left: 12, right: 12, top: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={28}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("id-ID", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("id-ID", {
                        weekday: "short",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      });
                    }}
                    formatter={(value, name) => {
                      if (metric === "revenue" || name === "revenue") {
                        return [formatCurrency(Number(value)), "Omset"];
                      }
                      return [`${value} Pesanan`, "Total Order"];
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey={metric}
                type="monotone"
                fill="url(#fillOrders)"
                stroke="var(--primary)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
