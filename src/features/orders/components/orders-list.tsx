"use client";

import { CardOrder, getEffectiveOrderStatus } from "@/app/(customer)/account/orders/_components/card-order";
import { useGetOrders } from "../api/get-orders";
import { Skeleton } from "@/components/ui/skeleton";
import { BsHandbagFill } from "react-icons/bs";
import { useTranslations } from "next-intl";

export const OrdersList = ({ status }: { status: string }) => {
  const t = useTranslations("account.orders");
  const { data: orders, isLoading: isLoadingOrders } = useGetOrders({
    queryConfig: {
      staleTime: 0,
      refetchOnMount: "always",
    },
  });

  const filteredOrders =
    status === "all"
      ? orders
      : orders?.filter((order) => {
          const effectiveStatus = getEffectiveOrderStatus(
            order.status,
            order.Payment?.status
          );
          return effectiveStatus === status.toLowerCase();
        });

  if (isLoadingOrders) {
    return (
      <div className="p-3 w-full h-full flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="border border-neutral-200 rounded-none p-4 flex flex-col gap-4 bg-white"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-16 w-full" />
            <div className="flex justify-between items-center mt-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-0 md:p-3 w-full flex-1 overflow-y-auto flex flex-col gap-3 font-sans text-neutral-900 select-none">
      {filteredOrders && filteredOrders.length > 0 ? (
        filteredOrders.map((order) => {
          const addressText = order.Address
            ? `${order.Address.city || ""}, ${order.Address.province || ""}`.replace(/^,\s*|,\s*$/g, "")
            : "-";

          return (
            <CardOrder
              key={order.id}
              orderId={order.id.toString()}
              createdAt={order.createdAt}
              status={order.status}
              paymentStatus={order.Payment?.status}
              address={addressText}
              orderItems={order.OrderItems}
              total_price={Number(order.total_price || 0)}
            />
          );
        })
      ) : (
        <div className="py-16 w-full flex justify-center items-center">
          <div className="w-full flex flex-col gap-3 items-center justify-center text-center">
            <div className="p-4 rounded-full bg-neutral-100 text-neutral-400">
              <BsHandbagFill className="text-3xl" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-neutral-900 text-sm">{t("empty")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
