"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { TabLinkOrder } from "./tab-link-order";
import { mockOrders } from "@/mocks/orders";
import { CardOrder } from "./card-order";

export const Orders = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? "pending";
  return (
    <div className="h-full w-full flex flex-col gap-2">
      <div className="flex flex-row gap-4">
        <TabLinkOrder
          isActive={status === "pending"}
          href={`${pathName}?status=pending`}
        >
          Belum Dibayar
        </TabLinkOrder>
        <TabLinkOrder
          isActive={status === "shipped"}
          href={`${pathName}?status=shipped`}
        >
          Dikirim
        </TabLinkOrder>
        <TabLinkOrder
          isActive={status === "completed"}
          href={`${pathName}?status=completed`}
        >
          Selesai
        </TabLinkOrder>
      </div>
      <div className="w-full border rounded-sm py-3  flex flex-row justify-around">
        {["Produk", "Harga", "Status"].map((item, index) => {
          return (
            <p
              key={index}
              className="w-1/3  text-center font-semibold text-foreground/50"
            >
              {item}
            </p>
          );
        })}
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col gap-3">
        {mockOrders
          .filter((item) => {
            return item.status === status;
          })
          .map((item) => {
            return (
              <CardOrder
                key={item.id}
                productName={item.productName}
                price={item.amount}
                status={item.status}
              />
            );
          })}
      </div>
    </div>
  );
};
