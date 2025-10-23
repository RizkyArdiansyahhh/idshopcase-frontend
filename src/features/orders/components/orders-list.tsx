/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetOrders } from "../api/get-orders";
import { CardOrder } from "@/app/(customer)/account/orders/_components/card-order";
import { Order } from "@/types/api";

type OrdersListProps = {
  status: "pending" | "shipped" | "completed";
};
export const OrdersList = ({ status }: OrdersListProps) => {
  const { data: orders } = useGetOrders();

  const filteredOrders = orders?.filter((order: Order) => {
    return order.status === status;
  });

  return (
    <>
      {filteredOrders?.map((order: Order) => {
        return (
          <CardOrder
            key={order.id}
            id={order.id}
            price={order.total_price}
            status={order.status}
          />
        );
      })}
    </>
  );
};
