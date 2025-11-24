"use client";
import { Badge } from "@/components/ui/badge";
import { useGetOrders } from "@/features/orders/api/get-orders";
import { useGetUsers } from "@/features/users/api/get-users";
import { Order, OrderAdmin } from "@/types/api";
import {
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { TableContent } from "../components/table-content";
import { CircleCheck, ClipboardClock, Loader, Plus, Truck } from "lucide-react";
import { useGetOrdersAdmin } from "@/features/orders/api/get-orders-admin";
import { formatCurrency } from "@/lib/format-currency";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const OrdersPage = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { push } = useRouter();
  const columnHelper = createColumnHelper<OrderAdmin>();

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
      columnHelper.accessor("User", {
        header: "Customer",
        cell: (info) => {
          const user = info.row.original.User.email;

          return (
            <Badge variant={user !== undefined ? "secondary" : "secondary"}>
              {user || "Anonymous"}
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
              {status === "pending" ? (
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
      columnHelper.accessor("total_price", {
        header: "Total",
        cell: (info) => {
          return (
            <span className="font-semibold">
              {formatCurrency(Number(info.getValue()))}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="data-[state=open]:bg-muted">
                <IconDotsVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  push(`/admin/orders/detail/${row.original.id}`);
                }}
              >
                Detail
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  // setSelectedUser(row.original);
                  // setActions("edit");
                  // setIsOpen(true);
                }}
              >
                Export
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        ),
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
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleColumnByStatus = (status?: string) => {
    if (!status) {
      setColumnFilters([]);
    } else {
      setColumnFilters([
        {
          id: "status",
          value: status,
        },
      ]);
    }
  };

  return (
    <>
      <div>
        <Tabs defaultValue="all" className="px-4">
          <div className="flex flex-row justify-between">
            <div>
              <TabsList>
                <TabsTrigger
                  value="all"
                  onClick={() => handleColumnByStatus(undefined)}
                >
                  All Order
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  onClick={() => handleColumnByStatus("pending")}
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="shipped"
                  onClick={() => handleColumnByStatus("shipped")}
                >
                  Shipped
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  onClick={() => handleColumnByStatus("completed")}
                >
                  Completed
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          <TabsContent value="all">
            <TableContent table={table} columns={columns}></TableContent>
          </TabsContent>
          <TabsContent value="pending">
            <TableContent table={table} columns={columns}></TableContent>
          </TabsContent>
          <TabsContent value="shipped">
            <TableContent table={table} columns={columns}></TableContent>
          </TabsContent>
          <TabsContent value="completed">
            <TableContent table={table} columns={columns}></TableContent>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default OrdersPage;
