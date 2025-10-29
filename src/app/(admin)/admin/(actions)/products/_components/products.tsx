"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProducts } from "@/features/product/api/get-ptoducts";
import { Product } from "@/types/api";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { TableContent } from "../../components/table-content";
import { Plus } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/lib/format-currency";

export const Products = () => {
  const columnHelper = createColumnHelper<Product>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
      }),
      columnHelper.accessor("name", {
        header: "Product Name",
        cell: ({ row }) => {
          const product = row.original;
          return (
            <div className="flex flex-row items-center gap-2">
              <div className="w-10 h-14 rounded-xs overflow-hidden relative">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                ></Image>
              </div>
              <span className="text-app-semibold-sm">{product.name}</span>
            </div>
          );
        },
      }),
      columnHelper.accessor("basePrice", {
        header: "Harga",
        cell: ({ row }) => {
          const product = row.original;
          return (
            <span className="text-app-semibold-sm">
              {formatCurrency(product.basePrice)}
            </span>
          );
        },
      }),
      columnHelper.accessor("baseStock", {
        header: "Stock",
        cell: ({ row }) => {
          const product = row.original;

          const hasVariants =
            Array.isArray(product.variantOptions) &&
            product.variantOptions.length > 0;

          if (hasVariants) {
            const totalStock = product.variantOptions?.reduce(
              (total, option) => {
                const variantStock = option.values?.reduce(
                  (sum, v) => sum + ((v.stock as number) || 0),
                  0
                );
                return total + (variantStock || 0);
              },
              0
            );
            return <span className="text-app-semibold-sm">{totalStock}</span>;
          }

          return (
            <span className="text-app-semibold-sm">
              {product.baseStock ?? 0}
            </span>
          );
        },
      }),
      // columnHelper.display({
      //   id: "actions",
      //   cell: ({ row }) => (
      //     <div>
      //       <button>View</button>
      //       <button>Edit</button>
      //       <button>Delete</button>
      //     </div>
      //   ),
      // }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { data: products } = useGetProducts();

  const table = useReactTable({
    data: products || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div>
        <div className="flex flex-row justify-between">
          <div></div>
          <div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                // setSelectedUser(null);
                // setActions("create");
                // setIsOpen(true);
              }}
              variant={"default"}
            >
              <div className="bg-background p-1 rounded-full">
                <Plus className="text-foreground" />
              </div>
              Tambah User
            </Button>
          </div>
        </div>
        <TableContent table={table} columns={columns}></TableContent>
      </div>
    </>
  );
};
