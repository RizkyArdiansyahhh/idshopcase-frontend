import { CardOrder } from "@/app/(customer)/account/orders/_components/card-order";
import { useGetOrders } from "../api/get-orders";
import { Skeleton } from "@/components/ui/skeleton";

export const OrdersList = ({ status }: { status: string }) => {
  const { data: orders, isLoading: isLoadingOrders } = useGetOrders();
  console.log(orders, "orders");

  const filteredOrders =
    status === "all"
      ? orders
      : orders?.filter(
          (order) => order.status.toLowerCase() === status.toLowerCase()
        );

  if (isLoadingOrders) {
    return (
      <div className="p-3 w-full h-full flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="border rounded-xl p-4 flex flex-col gap-4 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-4 w-2/3" />
            <div className="flex justify-between items-center mt-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="p-3 w-full h-full flex flex-col gap-3">
      {filteredOrders && filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <CardOrder
            key={order.id}
            orderId={order.id.toString()}
            createdAt={order.createdAt}
            status={order.status}
            address={`${order.Address.city}, ${order.Address.province}`}
            orderItems={order.OrderItems}
            total_price={Number(order.total_price)}
          />
        ))
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <p className="text-center text-muted-foreground">
            Tidak ada pesanan dengan status {status}
          </p>
        </div>
      )}
    </div>
  );
};
