"use client";
import { TabLinkOrder } from "./_components/tab-link-order";
import { usePathname, useSearchParams } from "next/navigation";

const OrdersPage = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? "pending";
  return (
    <>
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
    </>
  );
};

export default OrdersPage;
