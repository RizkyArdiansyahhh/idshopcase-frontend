/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import { useGetOrder } from "../api/get-order";
import OrderDetail from "@/app/(customer)/account/orders/_components/detail-order";
import { useGetUser } from "@/features/auth/api/get-user";
import { User } from "@/types/api";

export const OrderDetailById = () => {
  const { orderId } = useParams();

  const { data: order, isLoading: isLoadingOrder } = useGetOrder({
    id: Number(orderId),
  });

  const { data: user } = useGetUser();
  console.log(orderId, "orderId");
  console.log(order, "order aaaa");
  return (
    <>
      <div className="w-full h-full">
        <OrderDetail order={order as any} user={user as User}></OrderDetail>
      </div>
    </>
  );
};
