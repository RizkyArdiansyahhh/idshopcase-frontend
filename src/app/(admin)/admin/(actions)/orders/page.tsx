"use client";
import { Badge } from "@/components/ui/badge";
import { useGetOrders } from "@/features/orders/api/get-orders";
import { useGetUsers } from "@/features/users/api/get-users";
import { Order, OrderAdmin } from "@/types/api";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { TableContent } from "../components/table-content";
import { CircleCheck, ClipboardClock, Loader, Truck } from "lucide-react";
import { useGetOrdersAdmin } from "@/features/orders/api/get-orders-admin";

const OrdersPage = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const columnHelper = createColumnHelper<OrderAdmin>();

  const { data: users } = useGetUsers();

  const { data: orders } = useGetOrdersAdmin();
  console.log(orders, "orders");

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "number",
        header: "#",
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor("id", {
        header: "Order ID",
        cell: (info) => {
          return <span className="font-semibold">#{info.getValue()}</span>;
        },
      }),
      columnHelper.accessor("createdAt", {
        header: "Date",
        cell: (info) => {
          const date = new Date(info.getValue());
          return date.toLocaleDateString();
        },
      }),
      columnHelper.accessor("userId", {
        header: "Customer",
        cell: (info) => {
          const user = users?.find(
            (user) => user.id === Number(info.getValue())
          );

          return (
            <Badge variant={user !== undefined ? "secondary" : "secondary"}>
              {user?.name || "Anonymous"}
            </Badge>
          );
        },
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          return (
            <Badge variant={"outline"}>
              {" "}
              {status === "pemding" ? (
                <ClipboardClock className="text-foreground/60" />
              ) : status === "completed" ? (
                <CircleCheck className="text-green-600" />
              ) : status === "processing" ? (
                <Loader className="text-foreground" />
              ) : (
                <Truck className="text-foreground" />
              )}
              {info.getValue()}
            </Badge>
          );
        },
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const table = useReactTable({
    data: orders || [],
    columns,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div>
        <TableContent table={table} columns={columns}></TableContent>
      </div>
    </>
  );
};

export default OrdersPage;
